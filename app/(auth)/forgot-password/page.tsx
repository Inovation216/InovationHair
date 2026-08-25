"use client"

import { KeyRound, ArrowLeft, Mail, Clock, Loader2 } from "lucide-react"
import Link from "next/link"
import { useForgotPassword } from "./hook/use-forgot-password"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  const { register, errors, isPending, countdown, onSubmit } = useForgotPassword()

  return (
    <div className="w-full max-w-sm mx-auto space-y-10 py-10">
      {/* Cabeçalho */}
      <div className="flex flex-col items-center space-y-3 text-center lg:items-start lg:text-left">
        <div className="bg-primary p-3 rounded-2xl shadow-lg shadow-primary/20">
          <KeyRound className="w-8 h-8 text-primary-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Recuperar senha</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Esqueceu seus dados? Digite seu e-mail para receber um link de acesso.
          </p>
        </div>
      </div>

      {/* Formulário */}
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">
            Seu e-mail
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              id="email"
              type="email"
              {...register("email", { required: "O e-mail é obrigatório" })} 
              placeholder="exemplo@email.com" 
              className={`pl-9 ${
                errors.email ? "border-destructive focus-visible:ring-destructive" : ""
              }`}
            />
          </div>
          {errors.email && (
            <p className="text-xs font-bold text-destructive ml-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <Button 
          type="submit"
          className="w-full" 
          disabled={isPending || countdown > 0}
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : countdown > 0 ? (
            <>
              <Clock className="w-4 h-4 animate-pulse mr-2" />
              Aguarde {countdown}s
            </>
          ) : (
            "Enviar link de recuperação"
          )}
        </Button>
      </form>

      {/* Voltar ao Login */}
      <div className="text-center lg:text-left">
        <Link 
          href="/login" 
          className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Voltar para o login
        </Link>
      </div>
    </div>
  )
}