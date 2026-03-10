import { Stack } from 'expo-router';
import { useColorScheme} from 'react-native';

export default function Layout() {
  let colorScheme = useColorScheme();
  if(colorScheme === 'dark') {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options= {{headerShown:false}} />
        </Stack>
    )
  } else {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options= {{headerShown:false}} />
        </Stack>
    )
  }
}