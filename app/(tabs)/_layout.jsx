import { Tabs } from 'expo-router';
import { Appearance, UseColorScheme } from 'react-native/types_generated/index';

export default function TabsLayout() {
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