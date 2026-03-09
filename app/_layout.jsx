import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Appearance, UseColorScheme } from 'react-native/types_generated/index';

export default function Layout() {
  let colorScheme = useColorScheme();
  if(colorScheme === 'dark') {
    return <Tabs />;
  } else {
    return <Tabs />;
  }
}