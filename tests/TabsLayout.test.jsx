import { renderRouter, screen } from 'expo-router/testing-library';
import { HeaderToggle, HomeIcon, RoutesIcon, FavouritesIcon, TabsLayout } from '../app/(tabs)/_layout';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { THEME_KEY } from '../customHooks/customTheme';
import ThemeProvider from '../customHooks/themeProvider';
import { userEvent, waitFor } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

describe('TabsLayout full integration', () => {
test('should render the component with correct background color', async () => {

  await AsyncStorage.setItem(THEME_KEY, 'light');

  renderRouter(
    {
      '(tabs)/_layout': () => <TabsLayout />,
    },
    { initialUrl: '/', wrapper: ThemeProvider }
  );

  await screen.findByTestId('tabs');

  const tabsView = screen.getByTestId('tabs');

  const flattenedStyle = StyleSheet.flatten(tabsView.props.style);

  expect(flattenedStyle.backgroundColor).toBe('rgb(136, 186, 255)');
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

    expect(toggleButton).toBeOnTheScreen();
    expect(toggleButton).toHaveTextContent('light');

    await userEvent.press(toggleButton);
    
    expect(toggleButton).toHaveTextContent('dark');

    await waitFor(async () => {
    expect(await AsyncStorage.getItem(THEME_KEY)).toBe('dark');
  });
  });

  test('home icon should render' , async() => {
    await AsyncStorage.setItem(THEME_KEY, 'light');   

    renderRouter(
      {
        '(tabs)/_layout': () => <HomeIcon />
      },
      { initialUrl: '/', wrapper: ThemeProvider }
    );

    await screen.findByTestId('home-icon');

    const homeIcon = screen.getByTestId('home-icon');

    expect(homeIcon).toBeOnTheScreen();
  });

   test('routes icon should render' , async() => {
    await AsyncStorage.setItem(THEME_KEY, 'light');   

    renderRouter(
      {
        '(tabs)/_layout': () => <RoutesIcon />
      },
      { initialUrl: '/', wrapper: ThemeProvider }
    );

    await screen.findByTestId('routes-icon');

    const routesIcon = screen.getByTestId('routes-icon');

    expect(routesIcon).toBeOnTheScreen();
  });

   test('favourites icon should render' , async() => {
    await AsyncStorage.setItem(THEME_KEY, 'light');   

    renderRouter(
      {
        '(tabs)/_layout': () => <FavouritesIcon />
      },
      { initialUrl: '/', wrapper: ThemeProvider }
    );

    await screen.findByTestId('favourites-icon');

    const favouritesIcon = screen.getByTestId('favourites-icon');

    expect(favouritesIcon).toBeOnTheScreen();
  });
});   