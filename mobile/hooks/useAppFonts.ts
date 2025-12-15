import { useFonts, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';

export function useAppFonts() {
  const [fontsLoaded] = useFonts({
    'Montserrat-SemiBold': Montserrat_600SemiBold,
  });

  return fontsLoaded;
}