import { Tabs } from 'expo-router';
import { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ThemeContext } from '../../customHooks/themeProvider';
import { Ionicons } from '@expo/vector-icons';

const HeaderToggle = () => {
  const {colors, toggleTheme, theme} = useContext(ThemeContext);
  return( 
    <Pressable testID='toggleButton' style={[tabButton.toggleButton, {backgroundColor: colors.buttonColor, borderColor: colors.borderColor}]} onPressIn={toggleTheme}>
      <Text testID= 'themeText' style={[tabButton.toggleText, { color: colors.text }]}>{theme}</Text>
    </Pressable>
  );
};

const HomeIcon = ({ color, size }) => (
  <Ionicons name="home" size={size} color={color} testID="home-icon" />
);

const RoutesIcon = ({ color, size }) => (
  <Ionicons name="map" size={size} color={color} testID="routes-icon" />
);

const FavouritesIcon = ({ color, size }) => (
  <Ionicons name="star" size={size} color={color} testID="favourites-icon" />
);

 const TabsLayout = () => {

  const { colors } = useContext(ThemeContext);

  return (
    <View testID="tabs" style={[tabViewStyles.view, {backgroundColor: colors.background}]}>
      <Tabs
        screenOptions={({ route }) => ({
          tabBarStyle: { backgroundColor: colors.background },
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: "#f8feff",
          tabBarLabelStyle: { 
            fontSize: 12, 
            fontWeight: "bold" 
          },
          headerRight: () => <HeaderToggle />,
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'home') return <HomeIcon color={color} size={size} />;
            if (route.name === 'routes') return <RoutesIcon color={color} size={size} />;
            if (route.name === 'favourites') return <FavouritesIcon color={color} size={size} />;
            return null;
          },
        })}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
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
    </View>
  );
}

export default TabsLayout;
export { HeaderToggle, HomeIcon, RoutesIcon, FavouritesIcon, TabsLayout };

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

const tabViewStyles = StyleSheet.create({
   
  view: {
    flex:1
  }
});