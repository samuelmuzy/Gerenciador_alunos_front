"use client";
import "../globals.css";
import { useEffect } from "react";
import { AuthState, useAuthStore } from "@/src/stores/auth.store";
import { HeaderPortalProfessor } from "@/src/components/layout/HeaderPortalProfessor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loadUser = useAuthStore((state: AuthState) => state.loadUser)

  useEffect(() => {
    loadUser()
  }, [loadUser])

  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <HeaderPortalProfessor />
        {children}
      </body>
    </html>
  );
}