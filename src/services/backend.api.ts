import { cookies } from "next/headers";

export async function backendFetch(
  path: string,
  options?: RequestInit
) {
  const cookieStore = await cookies();

  const res = await fetch(`${process.env.API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      cookie: cookieStore.toString(),
      ...(options?.headers || {}),
    },
    credentials: "include",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erro na API");
  }

  return res.json();
}
