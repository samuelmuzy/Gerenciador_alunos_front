"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/src/stores/auth.store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const loadUser = useAuthStore((state) => state.loadUser);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    loadUser().finally(() => {
      setHydrated(true);
    });
  }, [loadUser]);

  if (!hydrated) return null;

  return <>{children}</>;
}