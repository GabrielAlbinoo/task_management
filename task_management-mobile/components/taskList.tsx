import { colors } from "@/theme/global";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import TaskCard from "./TaskCard";

type TaskListProps = {
  taskStatus: string;
};

export default function Tasklist({ taskStatus }: TaskListProps) {
  const tasks = [
    { title: "Task 1", status: "aberto", responsible: "John Doe", priority: "alta" },
    { title: "Task 2", status: "em_andamento", responsible: "Jane Smith", priority: "media" },
    { title: "Task 3", status: "finalizado", responsible: "Alice Johnson", priority: "baixa" },
  ];

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.listContent}
      data={tasks}
      keyExtractor={(_, index) => String(index)}
      renderItem={({ item }) => (
        <TaskCard
          title={item.title}
          status={item.status}
          responsible={item.responsible}
          priority={item.priority}
        />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.white,
  },
  listContent: {
    alignItems: "center",
    padding: 16,
  },
});
