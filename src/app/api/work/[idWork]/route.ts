import { ApiError } from "@/src/errors/api-error";
import { backendFetch } from "@/src/services/backend.api";
import { handleResponse } from "@/src/services/handle-response";

export async function GET(
    request: Request,
    context: { params: Promise<{ idWork: string }> }
  ) {
    try {
      const { idWork } = await context.params;
  
      const data = await backendFetch(`/work/${idWork}`);
  
      const response = await handleResponse(data);
      console.log(response)
  
      return Response.json(response);
    } catch (error) {
      if (error instanceof ApiError) {
        return Response.json(
          { message: error.message },
          { status: error.statusCode }
        );
      }
      return Response.json([], { status: 200 });
    }
  }
  