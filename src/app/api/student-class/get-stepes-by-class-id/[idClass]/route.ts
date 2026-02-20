import { backendFetch } from "@/src/services/backend.api";

export async function GET(
  request: Request,
  context: { params: Promise<{ idClass: string }> }
) {
  try {
    const { idClass } = await context.params;

    const data = await backendFetch(`/student-class/class/${idClass}/stages`);

    return Response.json(data);
  } catch (error) {
    
    console.error(error);
    return Response.json([], { status: 404 });
  }
}
