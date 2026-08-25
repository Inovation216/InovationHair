"use client"

import { ReactNode, useEffect, useState } from "react"
import { supabaseBrowser } from "@/lib/supabase/client"
import { AuthContext } from "@/contexts/auth-context"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Session } from "@supabase/supabase-js"

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient()
  const [session, setSession] = useState<Session | null>(null)
  const [isSessionLoading, setIsSessionLoading] = useState(true)
  const supabase = supabaseBrowser()

  // Busca o perfil completo na tabela 'profiles' usando o 'id' do usuário autenticado
  const fetchProfile = async () => {
    const { data: { session: currentSession } } = await supabase.auth.getSession()
    if (!currentSession?.user) return null

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", currentSession.user.id)
      .maybeSingle()
      
    return data
  }

  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["userProfile", session?.user?.id],
    queryFn: fetchProfile,
    enabled: !!session,
  })

  useEffect(() => {
    const loadSession = async () => {
      try {
        const { data: { session: localSession } } = await supabase.auth.getSession()
        setSession(localSession)
      } catch (error) {
        console.error("Erro ao carregar sessão:", error)
      } finally {
        setIsSessionLoading(false)
      }
    }

    loadSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event: unknown, newSession: Session | null) => {
      setSession(newSession)
      setIsSessionLoading(false)
      queryClient.invalidateQueries({ queryKey: ["userProfile"] })
    })

    return () => listener.subscription.unsubscribe()
  }, [queryClient])

  const globalLoading = isSessionLoading || (!!session && isProfileLoading)

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        session,
        profile: profile ?? null,
        loading: globalLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}