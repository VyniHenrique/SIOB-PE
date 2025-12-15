import { Tabs } from "expo-router";
import {} from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="Home"
        options={{
          tabBarActiveTintColor: "#981616",
          header: () => {
            return null;
          },
          title: "Início",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />
        }}
      />
      <Tabs.Screen
        name="MyRegisters"
        options={{
          title: "Meus Registros",
          tabBarIcon: ({ color }) => <AntDesign size={20} name="file" color={color} />,
          tabBarActiveTintColor: "#981616",
          header: () => {
            return null;
          },
        }}
      />
      <Tabs.Screen
        name="NewOccurrence"
        options={{
          title: "Registrar nova ocorrência",
          tabBarIcon: ({ color }) => <AntDesign size={20} name="file-add" color={color} />,
          tabBarActiveTintColor: "#981616",
          header: () => {
            return null;
          },
        }}
      />
    </Tabs>
  );
}
