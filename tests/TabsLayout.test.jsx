import { renderRouter, screen } from 'expo-router/testing-library';
import {HeaderToggle, TabsLayout} from '../app/(tabs)/_layout';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { THEME_KEY } from '../customHooks/customTheme';
import ThemeProvider from '../customHooks/themeProvider';
import { userEvent } from '@testing-library/react-native';

describe('TabsLayout full integration', () => {
  test('should render the component', async () => {

    await AsyncStorage.setItem(THEME_KEY, 'light');   

    renderRouter(
      {
        '(tabs)/_layout': () => <TabsLayout />,
      },
      { initialUrl: '/', wrapper: ThemeProvider }
    );

    await screen.findByTestId('tabs');

    const tabs = screen.getByTestId('tabs');
    
    expect(tabs.children[0].props.screenOptions.tabBarStyle.backgroundColor).toBe('rgb(136, 186, 255)');
    expect(screen.toJSON()).toMatchSnapshot();
  });
  
  test('button should toggle the theme' , async() => {

    await AsyncStorage.setItem(THEME_KEY, 'light');   

    renderRouter(
      {
        '(tabs)/_layout': () => <HeaderToggle />,
      },
      { initialUrl: '/', wrapper: ThemeProvider }
    );

    await screen.findByTestId('toggleButton');

    const toggleButton = screen.getByTestId('toggleButton');

    expect(toggleButton).toHaveTextContent('light');

    await userEvent.press(toggleButton);
    
    expect(toggleButton).toHaveTextContent('dark');
  });
});   