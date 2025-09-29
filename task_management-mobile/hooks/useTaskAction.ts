import { Task, TaskStatus, claimTask, completeTask } from "@/services/task";
import { getUserEmail } from "@/services/token";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "react-native-toast-notifications";

type PrimaryAction = {
  visible: boolean;
  label: string;
  onPress: () => void;
  disabled: boolean;
};

export function useTaskAction(
  task?: Pick<Task, "id" | "status" | "responsavel_nome" | "responsavel_email">
) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { data: userEmail } = useQuery({
    queryKey: ["auth-email"],
    queryFn: getUserEmail,
  });

  const isOwner = !!task && !!userEmail && task.responsavel_email === userEmail;
  const showTakeButton =
    !!task &&
    task.status === TaskStatus.OPEN &&
    (!task.responsavel_nome || task.responsavel_nome.length === 0);
  const showCompleteButton =
    !!task && task.status === TaskStatus.IN_PROGRESS && isOwner;

  const { mutate: claim, isPending: isClaiming } = useMutation({
    mutationFn: () => claimTask(task!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", task?.id] });
      toast.show("Tarefa atribuída com sucesso", { type: "success" });
    },
    onError: () => {
      toast.show("Não foi possível pegar a tarefa", { type: "danger" });
    },
  });

  const { mutate: complete, isPending: isCompleting } = useMutation({
    mutationFn: () => completeTask(task!.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", task?.id] });
      toast.show("Tarefa finalizada com sucesso", { type: "success" });
    },
    onError: () => {
      toast.show("Não foi possível finalizar a tarefa", { type: "danger" });
    },
  });

  const primaryAction: PrimaryAction = showTakeButton
    ? {
        visible: true,
        label: isClaiming ? "Pegando..." : "Pegar para mim",
        onPress: () => claim(),
        disabled: isClaiming,
      }
    : showCompleteButton
    ? {
        visible: true,
        label: isCompleting ? "Finalizando..." : "Finalizar",
        onPress: () => complete(),
        disabled: isCompleting,
      }
    : { visible: false, label: "", onPress: () => {}, disabled: true };

  return {
    userEmail,
    isOwner,
    showTakeButton,
    showCompleteButton,
    isClaiming,
    isCompleting,
    primaryAction,
  };
}
