import { backendFetch } from "@/src/services/backend.api";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await backendFetch("/student-class/validate-access-link", {
      method: "POST",
      body: JSON.stringify(body),
    });
    
    return Response.json(data);
  } catch (error) {
    console.log(error)
    return Response.json(
      { message: "Erro ao gerar link." },
      { status: 502 }
    );
  }
}