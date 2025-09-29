import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ToastProvider } from "react-native-toast-notifications";

export default function RootLayout() {
  const queryClient = new QueryClient()
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} edges={['top']}>
        <StatusBar style="auto" />
        <QueryClientProvider client={queryClient}>
          <ToastProvider
            placement="top"
            duration={3000}
            offsetTop={60}
            animationDuration={250}
            swipeEnabled
          >
            <Stack screenOptions={{headerShown: false}}/>
          </ToastProvider>
        </QueryClientProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
