import { ApiError } from "../errors/api-error";

export async function handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get("content-type");
  
    const data =
      contentType?.includes("application/json")
        ? await response.json()
        : null;
  
    if (!response.ok) {
      throw new ApiError(
        data?.message || "Erro desconhecido",
        response.status,
        data?.path,
        data?.timestamp
      );
    }
  
    return data as T;
  }