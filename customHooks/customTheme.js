import { useState
    
 } from "react";
const ThemeColors = {
    light: {
        background:"white",
        text: "black"
    },

    dark: {
        background: "black",
        text: "white"
    },
}

const useThemeColors = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return {
    colors: ThemeColors[theme],
    toggleTheme,
    theme,
  };
};

export default useThemeColors;