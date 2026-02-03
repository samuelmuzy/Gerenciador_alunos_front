import { backendFetch } from "@/src/services/backend.api";

export async function GET() {
    try {
        const response = await backendFetch('/auth/me');
        
        return Response.json(response);
    } catch (error) {
        return Response.json({ error: 'Erro ao carregar usuário' }, { status: 500 });
    }
  }