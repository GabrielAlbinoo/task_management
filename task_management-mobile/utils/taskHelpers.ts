import { TaskPriority, TaskStatus } from '@/services/task';

export function getStatusLabel(status: TaskStatus): string {
  const labels = {
    [TaskStatus.OPEN]: "Aberto",
    [TaskStatus.IN_PROGRESS]: "Em andamento", 
    [TaskStatus.DONE]: "Finalizado",
  };
  return labels[status] || String(status);
}

export function getStatusVariant(status: TaskStatus): "primary" | "warning" | "danger" {
  const variants: Record<TaskStatus, "primary" | "warning" | "danger"> = {
    [TaskStatus.OPEN]: "primary",
    [TaskStatus.IN_PROGRESS]: "warning",
    [TaskStatus.DONE]: "danger",
  };
  return variants[status] ?? "primary";
}

export function getPriorityLabel(priority: TaskPriority): string {
  const labels = {
    [TaskPriority.HIGH]: "Alta",
    [TaskPriority.MEDIUM]: "Média",
    [TaskPriority.LOW]: "Baixa",
  };
  return labels[priority] || String(priority);
}

export function getPriorityVariant(priority: TaskPriority): "primary" | "warning" | "danger" {
  const variants: Record<TaskPriority, "primary" | "warning" | "danger"> = {
    [TaskPriority.HIGH]: "danger",
    [TaskPriority.MEDIUM]: "warning", 
    [TaskPriority.LOW]: "primary",
  };
  return variants[priority] ?? "primary";
}
