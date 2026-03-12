import { useState } from "react";
const ThemeColors = {
    light: {
        background:"rgb(136, 186, 255)",
        text: "#FFFF",
    },

    dark: {
        background: "black",
        text: "#FFFF"
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