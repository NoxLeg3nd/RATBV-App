import { screen } from "@testing-library/react-native";
import {TabsLayout} from "../app/(tabs)/_layout";
import { renderCustomTheme } from "../test_utils/themeProviderWrapper";

test ("TabLayout renders successfuly", () => {
  renderCustomTheme(<TabsLayout/>)
  expect(screen.getByTestId('tabs')).toBeOnTheScreen();
});