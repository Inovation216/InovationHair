"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart2, Scissors, Sparkles } from "lucide-react"

const pageHeaderData: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Início",
    description: "Central de acesso aos módulos",
  },
  "/visao-geral": {
    title: "Visão Geral",
    description: "Acompanhe os indicadores e métricas consolidadas",
  },
  "/salao3-beleza": {
    title: "Salão de Beleza",
    description: "Gerenciamento de clientes, agendamentos e serviços",
  },
  "/terapia-capilar": {
    title: "Terapia Capilar",
    description: "Acompanhamento de anamneses e tratamentos capilares",
  },
  "/configuracoes": {
    title: "Configurações",
    description: "Gerencie os ajustes do sistema e do perfil",
  },
}

export function AppHeader() {
  const pathname = usePathname()
  const currentInfo = pageHeaderData[pathname] || {
    title: "Início",
    description: "Central de acesso aos módulos",
  }

  return (
    <header className="flex h-20 shrink-0 items-center gap-6 border-b px-8 bg-background/80 backdrop-blur-md sticky top-0 z-10 w-full">
      {/* Título e Descrição da Página (à esquerda) */}
      <div className="flex flex-col">
        <h1 className="text-xl font-serif font-bold tracking-tight text-foreground">
          {currentInfo.title}
        </h1>
        <p className="text-xs text-muted-foreground">
          {currentInfo.description}
        </p>
      </div>

      {/* Tabs / Atalhos de navegação rápida posicionados à direita com ml-auto */}
      <div className="hidden lg:flex items-center gap-1 bg-card/60 p-1.5 rounded-full border border-border/70 shadow-xs ml-auto">
        <Link
          href="/visao-geral"
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
            pathname === "/visao-geral"
              ? "bg-background text-foreground shadow-xs font-semibold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5 text-primary" />
          Visão Geral
        </Link>
        <Link
          href="/salao-de-beleza"
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
            pathname === "/salao-de-beleza"
              ? "bg-background text-foreground shadow-xs font-semibold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Scissors className="w-3.5 h-3.5 text-primary" />
          Salão de Beleza
        </Link>
        <Link
          href="/terapia-capilar"
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
            pathname === "/terapia-capilar"
              ? "bg-background text-foreground shadow-xs font-semibold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          Terapia Capilar
        </Link>
      </div>

      {/* Perfil do Usuário */}
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <span className="block text-xs font-bold text-foreground">
            Beatriz Andrade
          </span>
          <span className="block text-[10px] text-muted-foreground">
            Proprietária
          </span>
        </div>
        <div className="h-9 w-9 rounded-full bg-gradient-brand text-primary-foreground flex items-center justify-center font-bold text-xs shadow-sm">
          BA
        </div>
      </div>
    </header>
  )
}