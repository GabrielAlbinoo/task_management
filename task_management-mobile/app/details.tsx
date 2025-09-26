import InfoCard from "@/components/InfoCard";
import InfoRow from "@/components/InfoRow";
import Tag from "@/components/tag";
import { colors } from "@/theme/global";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Details() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </Pressable>
          <Text style={styles.headerTitle}>Detalhes da Tarefa</Text>
        </View>
        <View style={styles.tagsContainer}>
          <Tag text="Aberto" variant="primary" />
          <Tag text="Alta Prioridade" variant="danger" />
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <InfoCard title="Informações Gerais">
          <InfoRow label="Título" value="testando" />
          <InfoRow label="Responsável" value="Gabriel Albino" />
          <InfoRow label="Criado em" value="15 Jan 2024" />
          <InfoRow label="Atualizado em" value="22 Jan 2024" />
        </InfoCard>

        <InfoCard title="Descrição">
          <Text style={styles.description}>
            Implementar sistema completo de autenticação OAuth para permitir
            login social com Google e Facebook. A implementação deve incluir
            configuração dos provedores OAuth, interface de login responsiva,
            tratamento de erros e casos edge, e testes unitários e de
            integração. Implementar sistema completo de autenticação OAuth para
            permitir login social com Google e Facebook. A implementação deve
            incluir configuração dos provedores OAuth, interface de login
            responsiva, tratamento de erros e casos edge, e testes unitários e
            de integração. Implementar sistema completo de autenticação OAuth
            para permitir login social com Google e Facebook. A implementação
            deve incluir configuração dos provedores OAuth, interface de login
            responsiva, Implementar sistema completo de autenticação OAuth para
            permitir login social com Google e Facebook. A implementação deve
            incluir configuração dos provedores OAuth, interface de login
            responsiva, tratamento de erros e casos edge, e testes unitários e
            de integração. Implementar sistema completo de autenticação OAuth
            para permitir login social com Google e Facebook. A implementação
            deve incluir configuração dos provedores OAuth, interface de login
            responsiva, tratamento de erros e casos edge, e testes unitários e
            de integração. Implementar sistema completo de autenticação OAuth
            para permitir login social com Google e Facebook. A implementação
            deve incluir configuração dos provedores OAuth, interface de login
            responsiva, Implementar sistema completo de autenticação OAuth para
            permitir login social com Google e Facebook. A implementação deve
            incluir configuração dos provedores OAuth, interface de login
            responsiva, tratamento de erros e casos edge, e testes unitários e
            de integração. Implementar sistema completo de autenticação OAuth
            para permitir login social com Google e Facebook. A implementação
            deve incluir configuração dos provedores OAuth, interface de login
            responsiva, tratamento de erros e casos edge, e testes unitários e
            de integração. Implementar sistema completo de autenticação OAuth
            para permitir login social com Google e Facebook. A implementação
            deve incluir configuração dos provedores OAuth, interface de login
            responsiva, Implementar sistema completo de autenticação OAuth para
            permitir login social com Google e Facebook. A implementação deve
            incluir configuração dos provedores OAuth, interface de login
            responsiva, tratamento de erros e casos edge, e testes unitários e
            de integração. Implementar sistema completo de autenticação OAuth
            para permitir login social com Google e Facebook. A implementação
            deve incluir configuração dos provedores OAuth, interface de login
            responsiva, tratamento de erros e casos edge, e testes unitários e
            de integração. Implementar sistema completo de autenticação OAuth
            para permitir login social com Google e Facebook. A implementação
            deve incluir configuração dos provedores OAuth, interface de login
            responsiva, Implementar sistema completo de autenticação OAuth para
            permitir login social com Google e Facebook. A implementação deve
            incluir configuração dos provedores OAuth, interface de login
            responsiva, tratamento de erros e casos edge, e testes unitários e
            de integração. Implementar sistema completo de autenticação OAuth
            para permitir login social com Google e Facebook. A implementação
            deve incluir configuração dos provedores OAuth, interface de login
            responsiva, tratamento de erros e casos edge, e testes unitários e
            de integração. Implementar sistema completo de autenticação OAuth
            para permitir login social com Google e Facebook. A implementação
            deve incluir configuração dos provedores OAuth, interface de login
            responsiva, Implementar sistema completo de autenticação OAuth para
            permitir login social com Google e Facebook. A implementação deve
            incluir configuração dos provedores OAuth, interface de login
            responsiva, tratamento de erros e casos edge, e testes unitários e
            de integração. Implementar sistema completo de autenticação OAuth
            para permitir login social com Google e Facebook. A implementação
            deve incluir configuração dos provedores OAuth, interface de login
            responsiva, tratamento de erros e casos edge, e testes unitários e
            de integração. Implementar sistema completo de autenticação OAuth
            para permitir login social com Google e Facebook. A implementação
            deve incluir configuração dos provedores OAuth, interface de login
            responsiva, Implementar sistema completo de autenticação OAuth para
            permitir login social com Google e Facebook. A implementação deve
            incluir configuração dos provedores OAuth, interface de login
            responsiva, tratamento de erros e casos edge, e testes unitários e
            de integração. Implementar sistema completo de autenticação OAuth
            para permitir login social com Google e Facebook. A implementação
            deve incluir configuração dos provedores OAuth, interface de login
            responsiva, tratamento de erros e casos edge, e testes unitários e
            de integração. Implementar sistema completo de autenticação OAuth
            para permitir login social com Google e Facebook. A implementação
            deve incluir configuração dos provedores OAuth, interface de login
            responsiva, Implementar sistema completo de autenticação OAuth para
            permitir login social com Google e Facebook. A implementação deve
            incluir configuração dos provedores OAuth, interface de login
            responsiva, tratamento de erros e casos edge, e testes unitários e
            de integração. Implementar sistema completo de autenticação OAuth
            para permitir login social com Google e Facebook. A implementação
            deve incluir configuração dos provedores OAuth, interface de login
            responsiva, tratamento de erros e casos edge, e testes unitários e
            de integração. Implementar sistema completo de autenticação OAuth
            para permitir login social com Google e Facebook. A implementação
            deve incluir configuração dos provedores OAuth, interface de login
            responsiva, Implementar sistema completo de autenticação OAuth para
            permitir login social com Google e Facebook. A implementação deve
            incluir configuração dos provedores OAuth, interface de login
            responsiva, tratamento de erros e casos edge, e testes unitários e
            de integração. Implementar sistema completo de autenticação OAuth
            para permitir login social com Google e Facebook. A implementação
            deve incluir configuração dos provedores OAuth, interface de login
            responsiva, tratamento de erros e casos edge, e testes unitários e
            de integração. Implementar sistema completo de autenticação OAuth
            para permitir login social com Google e Facebook. A implementação
            deve incluir configuração dos provedores OAuth, interface de login
            responsiva, Implementar sistema completo de autenticação OAuth para
            permitir login social com Google e Facebook. A implementação deve
            incluir configuração dos provedores OAuth, interface de login
            responsiva, tratamento de erros e casos edge, e testes unitários e
            de integração. Implementar sistema completo de autenticação OAuth
            para permitir login social com Google e Facebook. A implementação
            deve incluir configuração dos provedores OAuth, interface de login
            responsiva, tratamento de erros e casos edge, e testes unitários e
            de integração. Implementar sistema completo de autenticação OAuth
            para permitir login social com Google e Facebook. A implementação
            deve incluir configuração dos provedores OAuth, interface de login
            responsiva, Implementar sistema completo de autenticação OAuth para
            permitir login social com Google e Facebook. A implementação deve
            incluir configuração dos provedores OAuth, interface de login
            responsiva, tratamento de erros e casos edge, e testes unitários e
            de integração. Implementar sistema completo de autenticação OAuth
            para permitir login social com Google e Facebook. A implementação
            deve incluir configuração dos provedores OAuth, interface de login
            responsiva, tratamento de erros e casos edge, e testes unitários e
            de integração. Implementar sistema completo de autenticação OAuth
            para permitir login social com Google e Facebook. A implementação
            deve incluir configuração dos provedores OAuth, interface de login
            responsiva,
          </Text>
        </InfoCard>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Pegar Tarefa</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.lighter,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.neutral.white,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.neutral.lighter,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.neutral.black,
  },
  tagsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  description: {
    fontSize: 14,
    color: colors.neutral.dark,
    lineHeight: 20,
  },
  buttonContainer: {
    alignItems: "center",
    padding: 12,
  },
  actionButton: {
    padding: 16,
    backgroundColor: colors.primary,
    width: "95%",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonText: {
    color: colors.neutral.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
