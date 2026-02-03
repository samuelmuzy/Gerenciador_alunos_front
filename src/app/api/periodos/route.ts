import { backendFetch } from "@/src/services/backend.api";

export async function GET() {
  try {
    const data = await backendFetch("/periodus");
    return Response.json(data);
  } catch {
    return Response.json([], { status: 200 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await backendFetch("/periodus", {
      method: "POST",
      body: JSON.stringify(body),
    });
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { message: "Erro ao criar período." },
      { status: 502 }
    );
  }
}
