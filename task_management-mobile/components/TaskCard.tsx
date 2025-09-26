import { colors } from "@/theme/global";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import Tag from "./tag";

interface TaskCardProps {
  title: string;
  status: string;
  responsible: string;
  priority: string;
}

export default function TaskCard({
  title,
  status,
  responsible,
  priority,
}: TaskCardProps) {
  const router = useRouter();

  const handleDetailsPress = () => {
    router.push("/details");
  };
  const onTakePress = () => {
    router.push("/details");
  };

  const priorityTagVariant =
    priority === "alta"
      ? "danger"
      : priority === "media"
      ? "warning"
      : "primary";

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Tag text={priority} variant={priorityTagVariant} />
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
          <CustomButton
            text="Pegar para mim"
            onPress={onTakePress}
            variant="primary"
          />
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
