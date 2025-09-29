import { colors } from "@/theme/global";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View
} from "react-native";

export type FormTextInputProps = TextInputProps & {
  label?: string;
};

export default function FormTextInput(props: FormTextInputProps) {
  const { label, style, ...inputProps } = props;

  return (
    <View style={[styles.field, !label ? styles.inlineField : undefined]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        {...inputProps}
        style={[styles.input, style]}
        placeholderTextColor={colors.neutral.dark}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 12,
  },
  inlineField: {
    marginBottom: 0,
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: colors.neutral.dark,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.neutral.medium,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.neutral.black,
    backgroundColor: colors.neutral.lighter,
  },
});
