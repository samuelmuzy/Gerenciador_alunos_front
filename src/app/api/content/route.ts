import { ApiError } from "@/src/errors/api-error";
import { backendFetch } from "@/src/services/backend.api";
import { handleResponse } from "@/src/services/handle-response";

export async function POST(req: Request) {
    try {
      const formData = await req.formData();
  
      const data = await backendFetch('/content',{
        method: "POST",
        body: formData,
      });

      const response = await handleResponse(data);
  
      return Response.json(response);

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