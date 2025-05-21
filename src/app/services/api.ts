import { formDataToJson } from "../lib/fromDataTojson";
import { ApiResponse } from "../types/types";

const API_BASE_URL = "http://localhost/tnet/api-backend/";

export const createClient = async (
  formData: FormData
): Promise<ApiResponse<never>> => {
  const jsonData = formDataToJson(formData);

  try {
    console.log("Enviando dados /POST para API", jsonData);

    const response = await fetch(`${API_BASE_URL}clientes/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    });

    const data = await response.json();

    console.log("Resposta da API", data);

    if (!response.ok) {
      throw new Error("Erro ao criar cliente");
    }

    return data as ApiResponse<never>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Erro ao criar cliente:", error);
    throw new Error("Erro ao criar cliente na API");
  }
};
