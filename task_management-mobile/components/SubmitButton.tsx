import { colors } from "@/theme/global";
import React from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

export type SubmitButtonProps = {
  text: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export default function SubmitButton(props: SubmitButtonProps) {
  const { text, onPress, loading = false, disabled = false } = props;
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={[styles.button, isDisabled && styles.buttonDisabled]}
    >
      {loading ? (
        <ActivityIndicator color={colors.neutral.white} />
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.buttons.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  buttonDisabled: {
    backgroundColor: colors.neutral.light,
  },
  buttonText: {
    color: colors.neutral.white,
    fontWeight: "700",
    fontSize: 16,
  },
});
