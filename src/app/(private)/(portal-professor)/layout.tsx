import type { Metadata } from "next";
import { SideBarPortalProfessor } from "@/src/components/layout/SideBarPortalProfessor";

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
    <div className="flex min-h-[calc(100vh-4rem)]">
      <SideBarPortalProfessor />
      <main className="flex-1 overflow-auto bg-slate-50">
        {children}
      </main>
    </div>
  );
}
