import { colors } from '@/theme/global'
import React from 'react'
import { StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native'

export type FormTextInputProps = TextInputProps & {
  label?: string
  helperText?: string | null
  containerStyle?: ViewStyle
}

export default function FormTextInput(props: FormTextInputProps) {
  const { label, helperText, containerStyle, style, ...inputProps } = props

  return (
    <View style={[styles.field, containerStyle]}> 
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput {...inputProps} style={[styles.input, style]} placeholderTextColor={colors.neutral.dark} />
      {helperText ? <Text style={styles.helper}>{helperText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 12,
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
  helper: {
    marginTop: 6,
    color: colors.warning,
  },
})


