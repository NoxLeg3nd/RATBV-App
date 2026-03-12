import {createContext} from 'react';
import useThemeColors from './customTheme';

export const ThemeContext = createContext();
export default function ThemeProvider({ children }) {
  const theme = useThemeColors();
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}