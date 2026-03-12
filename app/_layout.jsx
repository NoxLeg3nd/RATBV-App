import { Stack } from 'expo-router';
import ThemeProvider from '../customHooks/themeProvider'; 

export default function Layout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}