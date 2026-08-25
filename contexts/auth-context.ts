"use client"

import { createContext } from "react"
import { Session, User } from "@supabase/supabase-js"
import { Database } from "@/types/database"

export interface AuthContextType {
  user: User | null
  session: Session | null
  profile: Database["public"]["Tables"]["profiles"]["Row"] | null
  loading: boolean
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: true,
})