"use client"

import { useState } from "react"
import { Check, X, AlertCircle, Eye, EyeOff } from "lucide-react"
import { useResetPassword } from "./hook/use-reset-password"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const { 
    form: { register }, 
    rules, 
    isPending, 
    isSamePasswordError, 
    onSubmit, 
    allRulesValid 
  } = useResetPassword()

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Nova Senha</h1>
        <p className="text-sm text-muted-foreground">
          Escolha uma nova senha para sua conta.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Nova Senha */}
        <div className="space-y-2">
          <Label htmlFor="password">Nova Senha</Label>
          <div className="relative">
            <Input 
              id="password"
              type={showPassword ? "text" : "password"} 
              className="pr-10"
              {...register("password")} 
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Confirmar Senha */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar Senha</Label>
          <div className="relative">
            <Input 
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"} 
              className="pr-10"
              {...register("confirmPassword")} 
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {rules.map((rule, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              {rule.valid ? (
                <Check size={16} className="text-emerald-600" />
              ) : (
                <X size={16} className="text-muted-foreground" />
              )}
              <span className={rule.valid ? "text-emerald-700" : "text-muted-foreground"}>
                {rule.label}
              </span>
            </div>
          ))}
        </div>

        <Button 
          type="submit"
          className="w-full" 
          disabled={isPending || !allRulesValid}
        >
          {isPending ? "Salvando..." : "Atualizar senha"}
        </Button>

        {isSamePasswordError && (
          <div className="flex items-center gap-2 p-3 text-sm rounded-md bg-destructive/10 text-destructive">
            <AlertCircle size={16} />
            <p>A nova senha não pode ser igual à anterior.</p>
          </div>
        )}
      </form>
    </div>
  )
}