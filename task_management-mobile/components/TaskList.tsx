import { fetchTasks, TaskStatus } from "@/services/task";
import { colors } from "@/theme/global";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useCallback, useMemo } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import TaskCard from "./TaskCard";

type TaskListProps = {
  taskStatus: TaskStatus;
};

export default function Tasklist({ taskStatus }: TaskListProps) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ['tasks', taskStatus],
    queryFn: ({ pageParam }) => fetchTasks({ status: taskStatus, page: pageParam ?? 1 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage?.pagination?.has_more_pages
        ? (lastPage.pagination.current_page + 1)
        : undefined;
    },
  })

  const tasks = useMemo(() => {
    if (!data?.pages) return [] as any[];
    return data.pages.flatMap((p) => p.data ?? []);
  }, [data]);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  if (isError) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={{ color: colors.danger }}>Não foi possível carregar as tarefas.</Text>
      </View>
    )
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.listContent}
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <TaskCard
          id={item.id}
          title={item.titulo}
          status={item.status}
          responsible={item.responsavel_nome ?? ''}
          responsibleEmail={item.responsavel_email}
          priority={item.prioridade}
        />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      showsVerticalScrollIndicator={false}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.4}
      ListFooterComponent={
        isFetchingNextPage
          ? () => (
            <View style={{ paddingVertical: 16 }}>
              <ActivityIndicator color={colors.primary} />
            </View>
          )
          : undefined
      }
      refreshControl={
        <RefreshControl
          refreshing={Boolean(isRefetching && !isFetchingNextPage)}
          onRefresh={handleRefresh}
          colors={[colors.primary]}
          progressBackgroundColor={colors.neutral.white}
        />
      }
      ListEmptyComponent={() => (
        <View style={styles.center}>
          <Text style={{ color: colors.neutral.dark }}>Nenhuma tarefa encontrada.</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.white,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  listContent: {
    alignItems: "center",
    padding: 16,
  },
});
