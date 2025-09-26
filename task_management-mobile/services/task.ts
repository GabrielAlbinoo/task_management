import { api } from "@/navigation/api";

export enum TaskStatus {
    ABERTO = 'aberto',
    EM_ANDAMENTO = 'em_andamento',
    CONCLUIDO = 'concluido',
}

export enum TaskPriority {
    BAIXA = 'baixa',
    MEDIA = 'media',
    ALTA = 'alta',
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
    responsavel: string;
    criado_em: string;
    atualizado_em?: string;
};

export type TaskListResponse = {
    tasks: Task[];
    pagination: {
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
        has_more_pages: boolean;
    };
};


const TASK_URL = "/tarefas";

export async function fetchTasks(params: TaskQueryParams): Promise<TaskListResponse> {
    const { data } = await api.get<TaskListResponse>(TASK_URL, { params });
    return data;
}

export async function fetchTaskById(id: number): Promise<Task> {
    const { data } = await api.get<Task>(`${TASK_URL}/${id}`);
    return data;
}

export async function claimTask(id: number): Promise<{ success: boolean; task: Task }> {
    const { data } = await api.post<{ success: boolean; task: Task }>(`${TASK_URL}/${id}/pegar`);
    return data;
}

export async function completeTask(id: number): Promise<{ success: boolean; task: Task }> {
    const { data } = await api.post<{ success: boolean; task: Task }>(`${TASK_URL}/${id}/finalizar`);
    return data;
}
