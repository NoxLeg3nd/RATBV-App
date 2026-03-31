import { renderRouter, screen } from 'expo-router/testing-library';
import About from '../app/about';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { THEME_KEY } from '../customHooks/customTheme';
import ThemeProvider from '../customHooks/themeProvider';
import { StyleSheet } from 'react-native';
import {  userEvent, waitFor } from '@testing-library/react-native';
import { Linking } from 'react-native';

const mockOpenURL = jest.fn();
jest.spyOn(Linking, 'openURL').mockImplementation(mockOpenURL);   

jest.mock('../utils/db', () => ({
  getDB: jest.fn(() =>
    Promise.resolve({
      getFirstAsync: jest.fn().mockResolvedValue({
        agency_url: 'https://ratbv.ro',
        agency_phone: '0368 407 407',
        agency_email: 'contact@ratbv.ro',
      }),
    })
  ),
}));

describe('About full integration', () => {
    
    test('should render properly', async() => {
        
      await AsyncStorage.setItem(THEME_KEY, 'light');

        renderRouter(
        {
            'app/about': () => <About />,
        },
        { initialUrl: '/app/about', wrapper: ThemeProvider }
       );

       await screen.findByTestId('aboutView');

       const aboutView = screen.getByTestId('aboutView');

       const aboutFlattenedStyle = StyleSheet.flatten(aboutView.props.contentContainerStyle);
     
       expect(aboutView).toBeOnTheScreen();
       expect(aboutFlattenedStyle.backgroundColor).toBe("#FFFFFF");

       await waitFor(() => {});
    });

    test('images should be visible and have the correct source', async() => {

      await AsyncStorage.setItem(THEME_KEY, 'light');

        renderRouter(
        {
            'app/about': () => <About />,
        },
        { initialUrl: '/app/about', wrapper: ThemeProvider }
       );

      await screen.findByTestId('aboutGraphic');
      await screen.findByTestId('coverImage');

      const aboutGraphic = screen.getByTestId('aboutGraphic');
      const coverImage = screen.getByTestId('coverImage');
      
      expect(aboutGraphic).toBeOnTheScreen();
      expect(aboutGraphic.props.source.testUri).toBe('../../../assets/aboutgraphic.jpg');
      expect(coverImage).toBeOnTheScreen();
      expect(coverImage.props.source.testUri).toBe('../../../assets/ratbv.jpg');
      
      await waitFor(() => {});
    });

    beforeEach(() => {
     mockOpenURL.mockClear();
    });   

    test('pressables should open the url', async() =>{
      
      await AsyncStorage.setItem(THEME_KEY, 'light');

        renderRouter(
        {
            'app/about': () => <About />,
        },
        { initialUrl: '/app/about', wrapper: ThemeProvider }
       );

       await screen.findByTestId('url');
       await screen.findByTestId('phone');
       await screen.findByTestId('email');

       const pressableUrl = screen.getByTestId('url');
       const pressablePhone = screen.getByTestId('phone');
       const pressableEmail = screen.getByTestId('email');

       await userEvent.press(pressableUrl);
       await userEvent.press(pressablePhone);
       await userEvent.press(pressableEmail);

       await waitFor(() => {
        expect(mockOpenURL).toHaveBeenCalledWith('https://ratbv.ro');
        expect(mockOpenURL).toHaveBeenCalledWith('tel:0368407407');
        expect(mockOpenURL).toHaveBeenCalledWith('mailto:contact@ratbv.ro');
      });
   
    });
});