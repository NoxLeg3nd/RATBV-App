import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="routes" options={{ title: 'Routes' }} />
      <Tabs.Screen name="favourites" options={{ title: 'Favourites' }} />
    </Tabs>
  );
}