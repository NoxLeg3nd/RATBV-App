import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeColors = {
  light: {
    background: "rgb(136, 186, 255)",
    text: "#FFFF",
    paragraphText: "black",
    buttonColor: "rgb(85, 156, 255)",
    borderColor: "rgb(62, 142, 255)",
    middleBackground: "#FFFF",
    routesText: "black",
    routesButton: "white",
    routesBorder: "black",
    stopText: 'black'
  },

  dark: {
    background: "black",
    text: "#FFFF",
    paragraphText: "#FFFF",
    buttonColor: "black",
    borderColor: "#FFFF",
    middleBackground: "black",
    routesText: "black",
    routesButton: "white",
    routesBorder: "white",
    stopText: "white"
  },
};

export const THEME_KEY = "APP_THEME";

const useThemeColors = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem(THEME_KEY);
      if (storedTheme) {
        setTheme(storedTheme);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    await AsyncStorage.setItem(THEME_KEY, newTheme);
  };

  return {
    colors: ThemeColors[theme],
    toggleTheme,
    theme,
  };
};

export default useThemeColors;