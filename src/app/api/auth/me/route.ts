import { ApiError } from "@/src/errors/api-error";
import { backendFetch } from "@/src/services/backend.api";
import { handleResponse } from "@/src/services/handle-response";

export async function GET() {
    try {
        const data = await backendFetch('/auth/me');

        const response =  await data.json()
    
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