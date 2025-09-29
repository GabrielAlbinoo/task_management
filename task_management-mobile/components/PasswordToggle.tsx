import { colors } from "@/theme/global";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

export type PasswordToggleProps = {
  visible: boolean;
  onToggle: () => void;
  style?: ViewStyle;
  size?: number;
  color?: string;
};

export default function PasswordToggle(props: PasswordToggleProps) {
  const { visible, onToggle, style, size = 20, color = colors.primary } = props;

  return (
    <TouchableOpacity onPress={onToggle} style={[styles.toggle, style]}>
      <Ionicons
        name={visible ? "eye-off-outline" : "eye-outline"}
        size={size}
        color={color}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  toggle: {
    marginLeft: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});


