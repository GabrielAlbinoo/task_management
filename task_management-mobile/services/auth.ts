import { api } from "@/services/api";
import { setToken, setUserEmail } from "@/services/token";

export type LoginPayload = { email: string; password: string };
export type RegisterPayload = { name: string; email: string; password: string };

type LoginResponse = { data: { token: string; user: { email: string } } };
type RegisterResponse = { id: string; name: string; email: string };

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/login", payload);

  saveData(data);
  return data;
}

export async function register(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  const { data } = await api.post<RegisterResponse>("/register", payload);

  saveData(data);
  return data;
}

async function saveData(data: any) {
  const token = data.data?.token;
  const email = data.data?.user?.email;
  if (token) {
    await setToken(token);
  }
  if (email) {
    await setUserEmail(email);
  }
}
