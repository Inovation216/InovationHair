"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useSearchParams } from "next/navigation"
import { sendResetPasswordEmail } from "../services/send-reset-email"
import { ForgotPasswordData } from "../types/forgot-password-type"

const COOLDOWN_KEY = "forgot_password_cooldown"
const COOLDOWN_SECONDS = 60

export function useForgotPassword() {
  // Inicializa o estado de forma síncrona/preguiçosa sem precisar de useEffect
  const [countdown, setCountdown] = useState(() => {
    if (typeof window === "undefined") return 0
    const targetTime = localStorage.getItem(COOLDOWN_KEY)
    if (targetTime) {
      const remaining = Math.ceil((Number(targetTime) - Date.now()) / 1000)
      if (remaining > 0) {
        return remaining
      }
      localStorage.removeItem(COOLDOWN_KEY)
    }
    return 0
  })

  const searchParams = useSearchParams()
  const emailParam = searchParams.get("email") || ""
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset 
  } = useForm<ForgotPasswordData>({
    defaultValues: {
      email: emailParam
    }
  })

  // Gerencia o temporizador e atualiza o título da aba do navegador
  useEffect(() => {
    if (countdown <= 0) {
      document.title = "Recuperar Senha"
      return
    }

    document.title = `(${countdown}s) Recuperar Senha`

    const timer = setInterval(() => {
      const targetTime = localStorage.getItem(COOLDOWN_KEY)
      if (!targetTime) {
        setCountdown(0)
        return
      }

      const remaining = Math.ceil((Number(targetTime) - Date.now()) / 1000)
      
      if (remaining <= 0) {
        setCountdown(0)
        localStorage.removeItem(COOLDOWN_KEY)
        clearInterval(timer)
      } else {
        setCountdown(remaining)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [countdown])

  const { mutate, isPending } = useMutation({
    mutationFn: (email: string) => sendResetPasswordEmail({ email }),
    onSuccess: () => {
      toast.success("Link enviado!", {
        description: "Verifique sua caixa de entrada e spam."
      })
      
      const expiresAt = Date.now() + COOLDOWN_SECONDS * 1000
      localStorage.setItem(COOLDOWN_KEY, expiresAt.toString())
      setCountdown(COOLDOWN_SECONDS)
      
      reset()
    },
    onError: (error) => {
      console.error("Erro detalhado do Auth:", error);

      const message = error.message === "Too many requests" 
        ? "Muitas tentativas. Tente novamente em instantes." 
        : `Erro ao enviar: ${error.message || "Verifique o e-mail."}`
        
      toast.error(message)
    }
  })

  return {
    register,
    errors,
    isPending,
    countdown,
    onSubmit: handleSubmit((data) => mutate(data.email)),
  }
}