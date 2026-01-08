import { ProxyConfig, NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
}

const publicRoutes = [
  { path: "/signup-student", whenAuthorized: "redirect" },
  { path: "/signup-professor", whenAuthorized: "redirect" },
  { path: "/signin-professor", whenAuthorized: "redirect" },
  { path: "/signin-student", whenAuthorized: "redirect" },
  { path: "/", whenAuthorized: "redirect" },
  { path: "/login", whenAuthorized: "redirect" },
] as const;

const REDIRECT_URL_WHEN_UNAUTHORIZED = "/login";

export const proxy = (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const publicRoute = publicRoutes.find(route => route.path === pathname);

  const token = req.cookies.get("token")?.value;
  const isAuthenticated = !!token;

  //Rota pública e não autenticado → OK 
  if (!isAuthenticated && publicRoute) {
    return NextResponse.next();
  }

  //Rota privada e não autenticado → Redirect login
  if (!publicRoute && !isAuthenticated) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_URL_WHEN_UNAUTHORIZED;
    return NextResponse.redirect(redirectUrl);
  }

  // Rota pública e autenticado → Redirect home
  if (publicRoute && isAuthenticated && publicRoute.whenAuthorized === "redirect") {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  //Rota privada e autenticado → Verificar expiração
  if (!publicRoute && isAuthenticated && token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);

      const isExpired = Date.now() >= decoded.exp * 1000;

      if (isExpired) {
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = REDIRECT_URL_WHEN_UNAUTHORIZED;

        // Remover cookie
        const response = NextResponse.redirect(redirectUrl);
        response.cookies.delete("token");

        return response;
      }
    } catch {
      // Token inválido ou corrompido
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = REDIRECT_URL_WHEN_UNAUTHORIZED;
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
};

export const config: ProxyConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
