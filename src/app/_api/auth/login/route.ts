import { cookies } from "next/headers";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`${process.env.API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });

  // repassa cookies do backend
  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    (await cookies()).set({
      name: "token",
      value: setCookie.match(/token=([^;]+)/)?.[1] || '',
      httpOnly: true,
      path: "/",
    });
  }

  return Response.json(await res.json(), { status: res.status });
}
