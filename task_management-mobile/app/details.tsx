import InfoCard from "@/components/InfoCard";
import InfoRow from "@/components/InfoRow";
import Tag from "@/components/Tag";
import { useTaskAction } from "@/hooks/useTaskAction";
import { Task, fetchTaskById } from "@/services/task";
import { colors } from "@/theme/global";
import { getPriorityLabel, getPriorityVariant, getStatusLabel, getStatusVariant } from "@/utils/taskHelpers";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Details() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const taskId = useMemo(() => Number(params.id), [params.id]);

  const {
    data: task,
    isLoading,
    isError,
  } = useQuery<Task>({
    queryKey: ["task", taskId],
    queryFn: () => fetchTaskById(taskId),
    enabled: Number.isFinite(taskId),
  });

  const { primaryAction } = useTaskAction(task);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </Pressable>
          <Text style={styles.headerTitle}>Detalhes da Tarefa</Text>
        </View>

        <View style={styles.tagsContainer}>
          {!!task && (
            <>
              <Tag
                text={getStatusLabel(task.status)}
                variant={getStatusVariant(task.status)}
              />
              <Tag
                text={getPriorityLabel(task.prioridade)}
                variant={getPriorityVariant(task.prioridade)}
              />
            </>
          )}
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        {isLoading && (
          <View style={{ paddingVertical: 32, alignItems: "center" }}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}

        {isError && (
          <View style={{ paddingVertical: 32, alignItems: "center" }}>
            <Text style={{ color: colors.danger }}>
              Não foi possível carregar a tarefa
            </Text>
          </View>
        )}

        {!!task && (
          <InfoCard title="Informações Gerais">
            <InfoRow label="Título" value={task?.titulo ?? "-"} />
            <InfoRow
              label="Responsável"
              value={String(task?.responsavel_nome ?? "-")}
            />
            <InfoRow label="Criado em" value={formatDate(task?.criado_em)} />
            <InfoRow
              label="Atualizado em"
              value={formatDate(task?.atualizado_em)}
            />
          </InfoCard>
        )}

        {!!task && (
          <InfoCard title="Descrição">
            <Text style={styles.description}>{task?.descricao ?? "-"}</Text>
          </InfoCard>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        {primaryAction.visible && (
          <Pressable
            style={styles.actionButton}
            onPress={primaryAction.onPress}
            disabled={primaryAction.disabled}
          >
            <Text style={styles.actionButtonText}>{primaryAction.label}</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}


function formatDate(value?: string) {
  if (!value) return "-";
  try {
    const date = new Date(value);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return String(value);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.lighter,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.neutral.white,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.neutral.lighter,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.neutral.black,
  },
  tagsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  description: {
    fontSize: 14,
    color: colors.neutral.dark,
    lineHeight: 20,
  },
  buttonContainer: {
    alignItems: "center",
    padding: 12,
  },
  actionButton: {
    padding: 16,
    backgroundColor: colors.primary,
    width: "95%",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonText: {
    color: colors.neutral.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
