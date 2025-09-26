import { Ionicons } from "@expo/vector-icons";

type IconProps = {
  color: string;
  size: number;
}

export const openOption = {
  title: "Aberto",
  tabBarIcon: ({ color, size }: IconProps) => (
    <Ionicons name="folder-open-outline" size={size} color={color} />
  ),
};

export const inProgressOption = {
  title: "Em Andamento",
  tabBarIcon: ({ color, size }: IconProps) => (
    <Ionicons name="time-outline" size={size} color={color} />
  ),
};

export const finalizedOption = {
  title: "Finalizado",
  tabBarIcon: ({color, size}: IconProps) => (
    <Ionicons name="checkmark-done-outline" size={size} color={color} />
  )
};


