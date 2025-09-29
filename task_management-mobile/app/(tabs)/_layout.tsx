import { finalizedOption, inProgressOption, openOption } from "./tabOptions";
import { colors } from "@/theme/global";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.primary,
        tabBarActiveBackgroundColor: colors.highlight,
      }}
    >
      <Tabs.Screen name="open" options={openOption} />
      <Tabs.Screen name="inProgress" options={inProgressOption} />
      <Tabs.Screen name="finalized" options={finalizedOption} />
    </Tabs>
  );
}
