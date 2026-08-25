import { type NextRequest, NextResponse } from "next/server";
import { createClientForMiddleware } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Cria a resposta que poderá receber os cookies
  // atualizados pelo Supabase.
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createClientForMiddleware(request, response);

  // --------------------------------------------------
  // 1. VERIFICAR AUTENTICAÇÃO
  // --------------------------------------------------

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // --------------------------------------------------
  // 2. ROTAS DE AUTENTICAÇÃO
  // --------------------------------------------------

  const authRoutes = [
    "/login",
    "/cadastro",
    "/esqueci-senha",
    "/redefinir-senha",
  ];

  const isAuthRoute = authRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`),
  );

  // Se já estiver logada e tentar acessar login/cadastro,
  // manda para o dashboard.
  if (user && isAuthRoute) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url),
    );
  }

  // --------------------------------------------------
  // 3. ROTAS PÚBLICAS
  // --------------------------------------------------

  const publicRoutes = [
    "/login",
    "/cadastro",
    "/forgot-password",
    "/reset-password",
    "/callback",
  ];

  const isPublicRoute = publicRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isPublicRoute) {
    return response;
  }

  // --------------------------------------------------
  // 4. PROTEGER O SISTEMA
  // --------------------------------------------------

  if (!user) {
    return NextResponse.redirect(
      new URL("/login", request.url),
    );
  }

  // --------------------------------------------------
  // 5. USUÁRIO AUTENTICADO
  // --------------------------------------------------

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};