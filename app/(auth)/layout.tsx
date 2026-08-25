import { Sparkles, HeartHandshake } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[50%_50%]">
      {/* =====================================================
          LADO ESQUERDO
      ====================================================== */}
      <div
        className="
          relative hidden min-h-screen overflow-hidden
          flex-col justify-between
          px-14 py-12 text-white
          lg:flex
          bg-gradient-brand
        "
      >
        {/* Brilho decorativo */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20 bg-gradient-brand"
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div
            className="
              flex h-13 w-13 items-center justify-center
              rounded-full
              bg-gold
              text-sidebar-accent
              shadow-lg
            "
          >
            <span className="font-serif text-xl font-semibold">GB</span>
          </div>

          <div>
            <h1 className="font-serif text-xl font-semibold tracking-wide">
              Gestão Beatriz
            </h1>

            <p className="text-[11px] uppercase tracking-[0.25em] text-white/65">
              Beleza & Terapia
            </p>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="relative z-10 max-w-2xl">
          <h2 className="font-serif text-5xl font-medium leading-[1.15] tracking-tight">
            Beleza e cuidado
            <br />
            capilar em um só painel
          </h2>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/75">
            Organize a agenda do salão, acompanhe avaliações capilares e
            visualize os resultados do mês com clareza.
          </p>

          {/* Cards de informações */}
          <div className="mt-10 flex gap-4">
            <div
              className="
                min-w-[145px] rounded-2xl
                border border-white/10
                bg-white/10
                px-5 py-5
                backdrop-blur-sm
              "
            >
              <strong className="font-serif text-3xl font-medium">
                128
              </strong>

              <p className="mt-1 text-xs uppercase tracking-wider text-white/60">
                Clientes
              </p>
            </div>

            <div
              className="
                min-w-[145px] rounded-2xl
                border border-white/10
                bg-white/10
                px-5 py-5
                backdrop-blur-sm
              "
            >
              <strong className="font-serif text-3xl font-medium">
                46
              </strong>

              <p className="mt-1 text-xs uppercase tracking-wider text-white/60">
                Atendimentos
              </p>
            </div>

            <div
              className="
                min-w-[145px] rounded-2xl
                border border-white/10
                bg-white/10
                px-5 py-5
                backdrop-blur-sm
              "
            >
              <strong className="font-serif text-3xl font-medium">
                2
              </strong>

              <p className="mt-1 text-xs uppercase tracking-wider text-white/60">
                Unidades
              </p>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="relative z-10 text-xs text-white/50">
          © 2026 Gestão Beatriz — todos os direitos reservados
        </div>
      </div>

      {/* =====================================================
          LADO DIREITO
      ====================================================== */}
      <div className="flex min-h-screen flex-col justify-center bg-background px-6 sm:px-12 lg:px-20">
        {children}
      </div>
    </div>
  );
}