import { Tabs } from 'expo-router';
import { useContext } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { ThemeContext } from '../../customHooks/themeProvider';

export default function TabsLayout() {
  const { colors, toggleTheme, theme } = useContext(ThemeContext);

  const HeaderToggle = () => (
    <Pressable style={[tabButton.toggleButton, {backgroundColor: colors.buttonColor, borderColor: colors.borderColor}]} onPress={toggleTheme}>
      <Text style={[tabButton.toggleText, { color: colors.text }]}>{theme}</Text>
    </Pressable>
  );

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: colors.background },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: "#f8feff",
        tabBarLabelStyle: { 
          fontSize: 12, 
          fontWeight: "bold" },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerRight: () => <HeaderToggle/>,
          headerStyle: { 
            backgroundColor: colors.background 
          },
          headerTitleStyle: { 
            fontSize: 25, 
            color: colors.text 
          },
        }}
      />
      <Tabs.Screen
        name="routes"
        options={{
          title: "Routes",
          headerRight:  () => <HeaderToggle/>,
          headerStyle: { 
            backgroundColor: colors.background
           },
          headerTitleStyle: { 
            fontSize: 25, 
            color: colors.text 
          },
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: "Favourites",
          headerRight:  () => <HeaderToggle/>,
          headerStyle: { 
            backgroundColor: colors.background 
          },
          headerTitleStyle: { 
            fontSize: 25, 
            color: colors.text 
          },
        }}
      />
    </Tabs>
  );
}

const tabButton = StyleSheet.create({
  toggleButton: {
    width: 50,
    height: 30,
    marginRight: 10,
    borderWidth: 2,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});