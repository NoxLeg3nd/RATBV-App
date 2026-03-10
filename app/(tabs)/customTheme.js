import { useColorScheme } from "react-native";

const ThemeColors = {
    light: {
        background:"white",
        text: "black"
    },

    black: {
        background: "black",
        text: "white"
    },
}

const useThemeColors = () => {
const colorScheme = useColorScheme();
  const colors = ThemeColors[colorScheme];

  return colors;
}

export default useThemeColors;