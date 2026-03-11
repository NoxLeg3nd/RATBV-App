import { Tabs } from 'expo-router';
import { useContext } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { ThemeContext } from '../../customHooks/themeProvider';

export default function TabsLayout() {
  const { colors, toggleTheme, theme } = useContext(ThemeContext);

  const makeHeaderRight = () => (
    <Pressable style={tabButton.toggleButton} onPress={toggleTheme}>
      <Text style={[tabButton.toggleText, { color: colors.text }]}>{theme}</Text>
    </Pressable>
  );

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: colors.background },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: "#FFFF",
        tabBarLabelStyle: { 
          fontSize: 12, 
          fontWeight: "bold" },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerRight: makeHeaderRight,
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
          headerRight: makeHeaderRight,
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
          headerRight: makeHeaderRight,
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
    borderColor: "rgb(85, 156, 255)",
    borderRadius: 50,
    backgroundColor: "rgb(85, 156, 255)",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
});