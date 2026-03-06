"use client";
import "../globals.css";
import { HeaderPortalProfessor } from "@/src/components/layout/HeaderPortalProfessor";
import { AuthProvider } from "@/src/components/layout/AuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-BR">
      <body className="antialiased">     
          {children}   
      </body>
    </html>
  );
}