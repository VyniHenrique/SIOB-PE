import { Stack } from "expo-router";
export default function IncidentLayout() {
  
  return(
    
    <Stack screenOptions={{ headerShown: false}}>
      <Stack.Screen name="EditIncident"/>
    </Stack>
  );
}
