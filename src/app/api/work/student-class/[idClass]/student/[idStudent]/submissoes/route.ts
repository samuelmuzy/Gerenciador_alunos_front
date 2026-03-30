import { ApiError } from "@/src/errors/api-error";
import { backendFetch } from "@/src/services/backend.api";
import { handleResponse } from "@/src/services/handle-response";

export async function GET(
    request: Request,
    context: { params: Promise<{ idClass: string,idStudent:string }> }
  ) {
    try {
      const { idClass,idStudent } = await context.params;
  
      const data = await backendFetch(`/work/class/${idClass}/student/${idStudent}/submissions`);

      console.log(data)
  
      const response = await handleResponse(data);
      
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