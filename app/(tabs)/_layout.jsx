import { Tabs } from 'expo-router'
import useThemeColors from '../../customHooks/customTheme';
import  {Pressable, StyleSheet, Text}  from 'react-native';

export default function TabsLayout() {
   const { colors, toggleTheme, theme } = useThemeColors();

  const toggleButton = () => (
    <Pressable style={tabButton.toggleButton} onPress={toggleTheme}>
      <Text>{theme}</Text>
    </Pressable>
  );
  return (
    <Tabs  screenOptions={{ 
      tabBarStyle: { 
        backgroundColor: "rgb(136, 186, 255)"
        },
      tabBarActiveTintColor: "black",
      tabBarInactiveTintColor: "#FFFF",
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: "bold"
      },
        }}>
      <Tabs.Screen name="home" options={{ 
        title: 'Home',
        headerRight: toggleButton,
        headerStyle: {
          backgroundColor: "rgb(136, 186, 255)",
        },
        headerTitleStyle:{
          fontSize: 25,
          color: "#FFFF",
        },
        }} />
      <Tabs.Screen name="routes" options={{ 
        title: 'Routes',
        headerRight: toggleButton,
        headerStyle: {
          backgroundColor: "rgb(136, 186, 255)",
        },
        headerTitleStyle:{
          fontSize: 25,
          color: "#FFFF",
        },
        }} />
      <Tabs.Screen name="favourites" options={{ 
        title: 'Favourites',
        headerRight: toggleButton, 
        headerStyle: {
          backgroundColor: "rgb(136, 186, 255)",
        },
        headerTitleStyle:{
          fontSize: 25,
          color: "#FFFF",
        },
        }} />
    </Tabs>
  );
}

const tabButton = StyleSheet.create({

    toggleButton: {
    width: 30,
    height: 20,
    position: "relative", 
    borderWidth: 1,
    borderColor: "black",
    right: 50
  }, 

});
