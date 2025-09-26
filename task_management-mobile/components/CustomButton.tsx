import { colors } from "@/theme/global";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface CustomButtonProps {
  text: string;
  variant?: 'primary' | 'outline' | 'success';
  onPress?: () => void;
}

export default function CustomButton({ 
  text, 
  variant = 'primary', 
  onPress 
}: CustomButtonProps) {
  return (
    <Pressable 
      style={[styles.button, styles[variant]]} 
      onPress={onPress}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 12,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  primaryText: {
    color: colors.neutral.white,
  },
  outline: {
    backgroundColor: colors.neutral.white,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  outlineText: {
    color: colors.primary,
  },
  success: {
    backgroundColor: colors.success,
  },
  successText: {
    color: colors.neutral.white,
  },
});