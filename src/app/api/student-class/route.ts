import { ApiError } from "@/src/errors/api-error";
import { backendFetch } from "@/src/services/backend.api";
import { handleResponse } from "@/src/services/handle-response";

export async function GET() {
  try {
    const data = await backendFetch("/student-class");
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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await backendFetch("/student-class", {
      method: "POST",
      body: JSON.stringify(body),
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
