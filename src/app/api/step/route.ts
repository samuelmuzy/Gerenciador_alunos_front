import { backendFetch } from "@/src/services/backend.api";

export async function POST(req: Request) {
    try {
      const body = await req.json();
      const data = await backendFetch("/step", {
        method: "POST",
        body: JSON.stringify(body),
      });
      console.log(data);
      return Response.json(data);
    } catch (error) {
      return Response.json(
        { message: "Erro ao criar etapa." },
        { status: 502 }
      );
    }
  }