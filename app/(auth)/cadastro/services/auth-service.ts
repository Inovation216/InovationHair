import { supabaseBrowser } from "@/lib/supabase/client";
import { SignupFormData } from "../types/auth";

export async function signupUser(data: SignupFormData) {
  const supabase = supabaseBrowser();
  
  const { error, data: authData } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });

  if (error) throw error;
  return authData;
}