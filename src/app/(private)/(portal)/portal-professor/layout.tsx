import type { Metadata } from "next";
import { SideBarPortalProfessor } from "@/src/components/layout/SideBarPortalProfessor";
import { AuthProvider } from "@/src/components/layout/AuthProvider";
import { HeaderPortalProfessor } from "@/src/components/layout/HeaderPortalProfessor";

export const metadata: Metadata = {
  title: "Portal Professor",
  description: "Portal Professor",
};

export default function PortalProfessorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <body className="antialiased">
      <AuthProvider>
        <HeaderPortalProfessor />
        
        <div className="flex min-h-[calc(100vh-4rem)] h-full bg-white">
          <SideBarPortalProfessor />
          <main className="flex-1 overflow-auto bg-slate-50">
            {children}
          </main>
        </div>

      </AuthProvider>
    </body>

  );
}
