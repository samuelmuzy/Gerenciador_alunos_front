import { backendFetch } from "@/src/services/backend.api";

export async function GET() {
  try {
    const data = await backendFetch("/periodus");
    return Response.json(data);
  } catch {
    return Response.json([], { status: 200 });
  }
}
