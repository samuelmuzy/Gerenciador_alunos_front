import { ApiError } from "@/src/errors/api-error";
import { handleResponse } from "@/src/services/handle-response";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(`${process.env.API_URL}/auth/singin-professor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = await handleResponse(res);

    return Response.json(data, {
      status: res.status,
      headers: {
        "Set-Cookie": res.headers.get("set-cookie") ?? "",
      },
    });

  } catch (error) {
    if (error instanceof ApiError) {
      return Response.json(
        { message: error.message },
        { status: error.statusCode }
      );
    }
    return Response.json({ message: "Erro interno." }, { status: 502 });
  }
}
