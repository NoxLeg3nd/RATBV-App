import { Tabs } from 'expo-router';
import { Appearance, UseColorScheme } from 'react-native/types_generated/index';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="routes" options={{ title: 'Routes' }} />
      <Tabs.Screen name="favourites" options={{ title: 'Favourites' }} />
    </Tabs>
  );
}