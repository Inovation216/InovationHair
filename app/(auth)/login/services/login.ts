import { supabaseBrowser } from "@/lib/supabase/client"
import { LoginFormData } from "../types/login-form"

export async function login({ email, password }: LoginFormData) {
  const supabase = supabaseBrowser()

  // 2. Agora você acessa o .auth no client retornado
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}