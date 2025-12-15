import { Stack } from "expo-router";
import {
  useFonts,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";

export default function IndexLayout() {

  const [fontsLoaded] = useFonts({
    "Montserrat-SemiBold": Montserrat_600SemiBold, // <-- Fonte carregada globalmente!
  });
  
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="(incident)"
        options={{ animation: "fade_from_bottom", presentation: "card" }}
      />
    </Stack>
  );
}
