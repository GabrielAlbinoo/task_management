import FormTextInput from "@/components/FormTextInput";
import PasswordToggle from "@/components/PasswordToggle";
import SubmitButton from "@/components/SubmitButton";
import { login as loginService } from "@/services/auth";
import { colors } from "@/theme/global";
import { getErrorMessage } from "@/utils/errorHandler";
import { hasMinLength, isValidEmail } from "@/utils/validators";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: loginService,
    onSuccess: () => {
      router.replace("/open");
    },
    onError: (error: any) => {
      const errorMessage = getErrorMessage(
        error,
        "Não foi possível autenticar. Tente novamente."
      );
      setError(errorMessage);
    },
  });

  const isEmailValid = useMemo(() => isValidEmail(email), [email]);
  const isPasswordValid = useMemo(() => hasMinLength(password, 8), [password]);
  const isFormValid = isEmailValid && isPasswordValid;

  async function handleLogin() {
    if (!isFormValid) {
      setError(
        "Preencha um e-mail válido e senha com pelo menos 8 caracteres."
      );
      return;
    }
    setError(null);
    loginMutation.mutate({ email, password });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: "padding", android: undefined })}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Entrar</Text>

        <FormTextInput
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          placeholder="seu@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
        />

        <View style={styles.field}>
          <Text style={styles.label}>Senha</Text>
          <View style={styles.passwordRow}>
            <FormTextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Sua senha"
              secureTextEntry={!showPassword}
              returnKeyType="done"
              onSubmitEditing={handleLogin}
              style={styles.passwordInput}
            />

            <PasswordToggle
              visible={showPassword}
              onToggle={() => setShowPassword((v) => !v)}
              style={styles.toggle}
            />
          </View>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <SubmitButton
          text="Entrar"
          onPress={handleLogin}
          loading={loginMutation.isPending}
          disabled={!isFormValid}
        />

        <TouchableOpacity
          onPress={() => router.push("/register")}
          style={styles.secondaryLink}
        >
          <Text style={styles.secondaryText}>Registre-se</Text>
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
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
  },

  toggle: {
    marginLeft: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  toggleText: {
    color: colors.primary,
    fontWeight: "600",
  },
  error: {
    color: colors.danger,
    marginBottom: 12,
    marginTop: 4,
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
