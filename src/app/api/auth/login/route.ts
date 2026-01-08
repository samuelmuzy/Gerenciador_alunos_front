

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`${process.env.API_URL}/auth/singin-professor`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });

  const data = await res.json();

   return Response.json(data, {
    status: res.status,
    headers: {
      // MUITO IMPORTANTE
      "Set-Cookie": res.headers.get("set-cookie") ?? "",
    },
  });
}
