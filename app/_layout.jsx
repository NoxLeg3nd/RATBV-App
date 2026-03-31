import { Stack } from 'expo-router';
import ThemeProvider from '../customHooks/themeProvider';
import {FavouritesProvider} from "../customHooks/favouritesProvider";

export default function Layout() {
  return (
      <FavouritesProvider>
            <ThemeProvider>
                <Stack screenOptions={{ headerShown: false }} />
            </ThemeProvider>
      </FavouritesProvider>
  );
}