import { cookies } from "next/headers";

export async function backendFetch(
  path: string,
  options?: RequestInit
) {
  const cookieStore = cookies();

  const res = await fetch(`${process.env.API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      cookie: cookieStore.toString(), // repassa cookies
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
