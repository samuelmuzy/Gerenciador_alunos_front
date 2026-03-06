import { ApiError } from "@/src/errors/api-error";
import { backendFetch } from "@/src/services/backend.api";
import { handleResponse } from "@/src/services/handle-response";

export async function GET(
    request: Request,
    context: { params: Promise<{ idClass: string }> }
  ) {
    try {
      const { idClass } = await context.params;

      console.log(idClass)
  
      const data = await backendFetch(`/student/student-class/${idClass}/contents`);
  
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