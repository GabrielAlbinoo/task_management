import { colors } from '@/theme/global';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TagProps {
  text: string;
  variant?: 'primary' | 'warning' | 'danger';
}

export default function Tag({ text, variant = 'primary' }: TagProps) {
  return (
    <View style={[styles.container, styles[variant]]}>
      <Text style={[styles.text, styles[`${variant}Text`]]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
  primary: {
    backgroundColor: colors.primary,
  },
  primaryText: {
    color: colors.neutral.white,
  },
  warning: {
    backgroundColor: colors.warning,
  },
  warningText: {
    color: colors.neutral.white,
  },
  danger: {
    backgroundColor: colors.danger,
  },
  dangerText: {
    color: colors.neutral.white,
  },
})
