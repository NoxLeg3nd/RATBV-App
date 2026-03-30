import { renderRouter, screen } from 'expo-router/testing-library';
import Home from '../app/(tabs)/home';
import About from '../app/about';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { THEME_KEY } from '../customHooks/customTheme';
import ThemeProvider from '../customHooks/themeProvider';
import { StyleSheet } from 'react-native';
import { userEvent } from '@testing-library/react-native';

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

describe('Home full integration', () =>{
    
    test('home should render', async() => {
       await AsyncStorage.setItem(THEME_KEY, 'light');

       renderRouter(
        {
            '(tabs)/home': () => <Home />,
        },
        { initialUrl: '/(tabs)/home', wrapper: ThemeProvider }
       );

       await screen.findByTestId('home-layout');
       
       const homeLayout = screen.getByTestId('home-layout');
       const homeFlattenedStyle = StyleSheet.flatten(homeLayout.props.style);

       expect(homeFlattenedStyle.backgroundColor).toBe("#FFFFFF");
    });

    test('images should render and have a visible source', async() => {

       await AsyncStorage.setItem(THEME_KEY, 'light');

       renderRouter(
        {
            '(tabs)/home': () => <Home />,
        },
        { initialUrl: '/(tabs)/home', wrapper: ThemeProvider }
       );

       await screen.findByTestId('logoImage');
       await screen.findByTestId('bannerImage');

       const logo = screen.getByTestId('logoImage');
       const banner = screen.getByTestId('bannerImage');
      
       expect(logo).toBeOnTheScreen();
       expect(logo.props.source.testUri).toBe('../../../assets/ratbv.jpg');
       expect(banner).toBeOnTheScreen();
       expect(banner.props.source.testUri).toBe('../../../assets/coverphoto.jpg');       

    });

    test('button should navigate to About screen', async () => {

      await AsyncStorage.setItem(THEME_KEY, 'light');

      renderRouter(
        {
            '(tabs)/home': () => <Home />,
            'app/about': () => <About />,
        },
        { initialUrl: '/(tabs)/home', wrapper: ThemeProvider }
       );

       await screen.findByTestId('aboutButton');

       const aboutButton = screen.getByTestId('aboutButton');

       await userEvent.press(aboutButton);

       expect(require('expo-router').router.push).toHaveBeenCalledWith('../about');

    });
    
})