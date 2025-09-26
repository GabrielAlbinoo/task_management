import FormTextInput from "@/components/FormTextInput";
import { register as registerService } from "@/services/auth";
import { colors } from "@/theme/global";
import { getErrorMessage } from "@/utils/errorHandler";
import {
    hasMinLength,
    hasMinTrimmedLength,
    isValidEmail,
} from "@/utils/validators";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const isEmailValid = useMemo(() => isValidEmail(email), [email]);
  const isPasswordValid = useMemo(() => hasMinLength(password, 8), [password]);
  const isNameValid = useMemo(() => hasMinTrimmedLength(name, 2), [name]);
  const isFormValid = isEmailValid && isPasswordValid && isNameValid;

  const registerMutation = useMutation({
    mutationFn: registerService,
    onSuccess: () => {
      router.replace("/open");
    },
    onError: (error: any) => {
      const errorMessage = getErrorMessage(error, 'Não foi possível registrar. Tente novamente.');
      setError(errorMessage);
    },
  });

  function handleRegister() {
    if (!isFormValid) {
      setError("Preencha nome, e-mail válido e senha de 8+ caracteres.");
      return;
    }
    setError(null);
    registerMutation.mutate({ name, email, password });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Criar conta</Text>

        <FormTextInput
          label="Nome"
          value={name}
          onChangeText={setName}
          placeholder="Seu nome"
          helperText={
            !isNameValid && name.length > 0
              ? "O nome deve ter ao menos 2 caracteres."
              : null
          }
        />

        <FormTextInput
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholder="seu@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          helperText={
            !isEmailValid && email.length > 0
              ? "Informe um e-mail válido."
              : null
          }
        />

        <FormTextInput
          label="Senha"
          value={password}
          onChangeText={setPassword}
          placeholder="Crie uma senha"
          secureTextEntry
          helperText={
            !isPasswordValid && password.length > 0
              ? "A senha deve ter ao menos 8 caracteres."
              : null
          }
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          disabled={!isFormValid || registerMutation.isPending}
          style={[
            styles.button,
            (!isFormValid || registerMutation.isPending) &&
              styles.buttonDisabled,
          ]}
          onPress={handleRegister}
        >
          {registerMutation.isPending ? (
            <ActivityIndicator color={colors.neutral.white} />
          ) : (
            <Text style={styles.buttonText}>Registrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.secondaryLink}
        >
          <Text style={styles.secondaryText}>Já tem uma conta? Entrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.lighter,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: colors.neutral.white,
    borderRadius: 12,
    padding: 20,
    shadowColor: colors.neutral.black,
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.neutral.black,
    marginBottom: 16,
  },
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
  error: {
    color: colors.danger,
    marginBottom: 12,
    marginTop: 4,
  },
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
  secondaryLink: {
    alignItems: "center",
    marginTop: 12,
  },
  secondaryText: {
    color: colors.primary,
    fontWeight: "600",
  },
});
