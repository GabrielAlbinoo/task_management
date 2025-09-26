import { api } from "@/navigation/api";

export type LoginPayload = { email: string; password: string };
export type RegisterPayload = { name: string; email: string; password: string };

type LoginResponse = { token: string; user: { email: string } };
type RegisterResponse = { id: string; name: string; email: string };

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/login", payload);
  return data;
}

export async function register(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  const { data } = await api.post<RegisterResponse>("/register", payload);
  return data;
}
