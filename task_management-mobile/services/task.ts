import { api } from "@/services/api";

export enum TaskStatus {
  OPEN = "aberto",
  IN_PROGRESS = "em_andamento",
  DONE = "finalizado",
}

export enum TaskPriority {
  LOW = "baixa",
  MEDIUM = "media",
  HIGH = "alta",
}

export type TaskQueryParams = {
  page?: number;
  status?: TaskStatus;
  priority?: TaskPriority;
  search?: string;
};

export type Task = {
  id: number;
  titulo: string;
  descricao: string;
  status: TaskStatus;
  prioridade: TaskPriority;
  responsavel_nome: string;
  responsavel_email: string | null;
  criado_em: string;
  atualizado_em?: string;
};

export type TaskListResponse = {
  success: boolean;
  message: string;
  data: Task[];
  pagination: {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    has_more_pages: boolean;
  };
};

const TASK_URL = "/tarefas";

export async function fetchTasks(
  params: TaskQueryParams
): Promise<TaskListResponse> {
  try {
    const entries = Object.entries({
      status: params.status,
      priority: params.priority,
      search: params.search,
      page: params.page != null ? String(params.page) : undefined,
    }).filter(([, v]) => v != null) as [string, string][];

    const searchParams = new URLSearchParams(entries);
    const qs = searchParams.toString();

    const { data } = await api.get<TaskListResponse>(
      `${TASK_URL}${qs ? `?${qs}` : ""}`
    );
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchTaskById(id: number): Promise<Task> {
  const { data } = await api.get<{ data: Task }>(`${TASK_URL}/${id}`);
  return data?.data;
}

export async function claimTask(
  id: number
): Promise<{ success: boolean; task: Task }> {
  const { data } = await api.post<{ success: boolean; task: Task }>(
    `${TASK_URL}/${id}/pegar`
  );
  return data;
}

export async function completeTask(
  id: number
): Promise<{ success: boolean; task: Task }> {
  const { data } = await api.post<{ success: boolean; task: Task }>(
    `${TASK_URL}/${id}/finalizar`
  );
  return data;
}
