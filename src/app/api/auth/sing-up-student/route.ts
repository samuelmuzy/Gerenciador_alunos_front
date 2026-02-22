import { backendFetch } from "@/src/services/backend.api";

export async function POST(req: Request) {
    const body = await req.json();
  
    const res = await backendFetch(`/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    });
  
    const data = await res.json();
  
     return Response.json(data, {
      status: res.status,
      headers: {
        "Set-Cookie": res.headers.get("set-cookie") ?? "",
      },
    });
  }