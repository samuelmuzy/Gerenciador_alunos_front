import { backendFetch } from "@/src/services/backend.api";
import { handleResponse } from "@/src/services/handle-response";
import { ApiError } from "next/dist/server/api-utils";

export async function GET(
  request: Request,
  context: { params: Promise<{ idClass: string }> }
) {
  try {
    const { idClass } = await context.params;

    const data = await backendFetch(`/student-class/${idClass}/students`);

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