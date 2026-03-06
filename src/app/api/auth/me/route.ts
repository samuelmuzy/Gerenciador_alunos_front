import { ApiError } from "@/src/errors/api-error";
import { backendFetch } from "@/src/services/backend.api";
import { handleResponse } from "@/src/services/handle-response";

export async function GET() {
    try {
        const data = await backendFetch('/auth/me');

        if(!data.ok){
            throw new Error("Usuário sem autorização")
        }

        const response = await data.json()

        return Response.json(response);
    } catch (error) {
        return Response.json({ message: "Erro interno." }, { status: 502 });
    }
  }