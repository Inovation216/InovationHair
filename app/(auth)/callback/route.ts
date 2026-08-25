import { supabaseServer } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/dashboard" // Dica: mude para algo não protegido se for teste

  if (code) {
    const supabase = await supabaseServer()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Cria a URL de redirecionamento corretamente
      const redirectUrl = new URL(next, origin)
      return NextResponse.redirect(redirectUrl)
    }
    
    // LOG IMPORTANTE: olhe o terminal do VS Code
    console.error("Erro detalhado do Auth:", error)
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`)
}