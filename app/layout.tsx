import type { Metadata } from "next";
import { Noto_Serif, Roboto, Public_Sans, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";

import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import QueryProvider from "@/providers/query-provider";
import { AuthProvider } from "@/providers/auth-provider";

import "./styles/globals.css";

const playfairDisplayHeading = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' });

const publicSans = Public_Sans({ subsets: ['latin'], variable: '--font-sans' });

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://inovationhair.vercel.app"),

  title: {
    default: "Gestão Beatriz — Beleza & Terapia",
    template: "%s | Gestão Beatriz",
  },

  description:
    "Sistema de gestão para controle de clientes, atendimentos, tratamentos e terapia capilar.",

  applicationName: "Gestão Beatriz",

  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://inovationhair.vercel.app",
    siteName: "Gestão Beatriz",
    title: "Gestão Beatriz — Beleza & Terapia",
    description: "Sistema de gestão para controle de clientes, atendimentos, tratamentos e terapia capilar.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Gestão Beatriz - Beleza & Terapia",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Gestão Beatriz — Beleza & Terapia",
    description: "Sistema de gestão para controle de clientes, atendimentos, tratamentos e terapia capilar.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={cn(
        "scroll-smooth",
        roboto.variable,
        notoSerif.variable,
        "light",
        "font-sans", 
        publicSans.variable, 
        playfairDisplayHeading.variable
      )}
    >
      <body className="font-sans antialiased">
        <QueryProvider>
          <AuthProvider>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster richColors position="bottom-right" closeButton />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}