import * as React from "react"

export function SidebarLogo() {
  return (
    <div className="flex items-center gap-3 px-2 py-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-sidebar-accent font-serif font-bold text-base border border-gold/40 shadow-sm">
        GB
      </div>
      <div className="flex flex-col">
        <span className="font-serif font-bold text-sm leading-tight text-sidebar-foreground tracking-wide">
          Gestão Beatriz
        </span>
        <span className="text-[12px] tracking-widest text-input uppercase mt-0.5 font-sans">
          BELEZA & TERAPIA
        </span>
      </div>
    </div>
  )
}