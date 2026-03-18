import { Tabs } from 'expo-router';
import { useContext } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { ThemeContext } from '../../customHooks/themeProvider';
import { Ionicons } from '@expo/vector-icons';

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
            tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
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
            tabBarIcon: ({ color, size }) => <Ionicons name="map" size={size} color={color} />,
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
            tabBarIcon: ({ color, size }) => <Ionicons name="star" size={size} color={color} />,
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