export interface IClient {
  id_cliente: string;
  nome: string;
  email: string;
  senha: string;
}
 
export interface ApiResponse<T> {
    status: "sucess" | "error"; 
    message: string;
    data: T;
}