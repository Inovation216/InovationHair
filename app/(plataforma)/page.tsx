import { BarChart2, Scissors, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-6 w-full">
      {/* Banner de Boas-Vindas com o gradiente exato do tema */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-8 md:p-10 text-primary-foreground shadow-elegant">
        <div className="relative z-10 space-y-2">
          <span className="text-[11px] uppercase tracking-widest text-primary-foreground/70 font-semibold">
            BEM-VINDA
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
            Olá, Beatriz
          </h2>
          <p className="text-primary-foreground/80 text-sm font-normal max-w-md pt-1">
            Escolha a área que deseja acessar.
          </p>
        </div>
        {/* Elemento decorativo sutil no fundo do banner */}
        <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
      </div>

      {/* Cards dos Módulos */}
      <div className="grid gap-6 md:grid-cols-3 pt-2">
        {/* Card Salão de Beleza */}
        <div className="group rounded-3xl border border-border/60 bg-card p-6 shadow-card flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-primary/40">
          <div>
            <div className="h-12 w-12 rounded-2xl bg-secondary/80 text-primary flex items-center justify-center mb-5 shadow-sm border border-border/40 transition-all duration-300 group-hover:bg-gradient-brand group-hover:text-primary-foreground group-hover:scale-110">
              <Scissors className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-card-foreground">
              Salão de Beleza
            </h3>
            <p className="text-muted-foreground text-xs leading-relaxed mt-2">
              Gerencie clientes, serviços e atendimentos do salão.
            </p>
          </div>
          <div className="pt-6">
            <Button 
              nativeButton={false}
              render={<Link href="/salao-de-beleza">Acessar</Link>}
              className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-medium rounded-xl h-11 shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Card Terapia Capilar */}
        <div className="group rounded-3xl border border-border/60 bg-card p-6 shadow-card flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-primary/40">
          <div>
            <div className="h-12 w-12 rounded-2xl bg-secondary/80 text-primary flex items-center justify-center mb-5 shadow-sm border border-border/40 transition-all duration-300 group-hover:bg-gradient-brand group-hover:text-primary-foreground group-hover:scale-110">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-card-foreground">
              Terapia Capilar
            </h3>
            <p className="text-muted-foreground text-xs leading-relaxed mt-2">
              Gerencie avaliações, anamneses e tratamentos capilares.
            </p>
          </div>
          <div className="pt-6">
            <Button 
              nativeButton={false}
              render={<Link href="/terapia-capilar">Acessar</Link>}
              className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-medium rounded-xl h-11 shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Card Visão Geral */}
        <div className="group rounded-3xl border border-border/60 bg-card p-6 shadow-card flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-primary/40">
          <div>
            <div className="h-12 w-12 rounded-2xl bg-secondary/80 text-primary flex items-center justify-center mb-5 shadow-sm border border-border/40 transition-all duration-300 group-hover:bg-gradient-brand group-hover:text-primary-foreground group-hover:scale-110">
              <BarChart2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-card-foreground">
              Visão Geral
            </h3>
            <p className="text-muted-foreground text-xs leading-relaxed mt-2">
              Acompanhe o resumo das duas áreas.
            </p>
          </div>
          <div className="pt-6">
            <Button 
              nativeButton={false}
              render={<Link href="/visao-geral">Visualizar</Link>}
              className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-medium rounded-xl h-11 shadow-sm transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
}