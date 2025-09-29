import { useTaskAction } from "@/hooks/useTaskAction";
import { TaskPriority, TaskStatus } from "@/services/task";
import { colors } from "@/theme/global";
import { getPriorityLabel, getPriorityVariant } from "@/utils/taskHelpers";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import Tag from "./Tag";

interface TaskCardProps {
  id: number;
  title: string;
  status: TaskStatus;
  responsible: string;
  responsibleEmail?: string | null;
  priority: TaskPriority;
}

export default function TaskCard({
  id,
  title,
  status,
  responsible,
  responsibleEmail,
  priority,
}: TaskCardProps) {
  const router = useRouter();
  const { primaryAction } = useTaskAction({
    id,
    status,
    responsavel_nome: responsible,
    responsavel_email: responsibleEmail ?? null,
  });

  const handleDetailsPress = () => {
    router.push({ pathname: "/details", params: { id: String(id) } });
  };
  const onPrimaryPress = () => {
    primaryAction.onPress();
  };

  const priorityTagVariant = getPriorityVariant(priority);
  const priorityText = getPriorityLabel(priority);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Tag text={priorityText} variant={priorityTagVariant} />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.responsibleContainer}>
          {responsible && (
            <Text style={styles.responsibleText}>
              Responsável: {responsible}
            </Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            text="Detalhes"
            onPress={handleDetailsPress}
            variant="outline"
          />
          {primaryAction.visible && (
            <CustomButton
              text={primaryAction.label}
              onPress={onPrimaryPress}
              variant="primary"
              disabled={primaryAction.disabled}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: 112,
    backgroundColor: colors.neutral.lighter,
    borderColor: colors.neutral.light,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    padding: 16,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.neutral.black,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    alignItems: "center",
  },
  responsibleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  responsibleText: {
    fontSize: 12,
    color: colors.neutral.black,
  },
});
