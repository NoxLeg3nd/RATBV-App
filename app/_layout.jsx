import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function Layout() {
  let colorScheme = useColorScheme();
  if(colorScheme === 'dark') {
    return <Tabs />;
  } else {
    return <Tabs />;
  }
}