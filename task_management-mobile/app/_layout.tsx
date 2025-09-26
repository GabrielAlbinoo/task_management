import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const queryClient = new QueryClient()
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>
        <StatusBar style="auto" />
        <QueryClientProvider client={queryClient}>
          <Stack screenOptions={{headerShown: false}}/>
        </QueryClientProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
