import { backendFetch } from "@/src/services/backend.api";

export async function POST(req: Request) {
    try {
      const formData = await req.formData();
  
      const data = await backendFetch('/content',{
        method: "POST",
        body: formData,
      });
  
      const response = await data.json();
  
      return Response.json(response);
    } catch (error) {
      return Response.json(
        { message: "Erro ao criar período." },
        { status: 502 }
      );
    }
  }