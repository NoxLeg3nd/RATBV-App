import { renderRouter, screen } from 'expo-router/testing-library';
import Routes from '../app/(tabs)/routes';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { THEME_KEY } from '../customHooks/customTheme';
import ThemeProvider from '../customHooks/themeProvider';
import { StyleSheet } from 'react-native';
import { openDatabaseAsync } from 'expo-sqlite';

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
  },
}));

jest.mock('expo-sqlite', () => ({
  openDatabaseAsync: jest.fn().mockImplementation(() => Promise.resolve({
    execAsync: jest.fn().mockResolvedValue(undefined),
    runAsync: jest.fn().mockResolvedValue({ lastInsertRowId: 1, changes: 1 }),
    getAllAsync: jest.fn().mockResolvedValue([
      { 
        route_id: '1', 
        route_short_name: '1', 
        route_long_name: 'Triaj - Livada Poștei',
        route_type: 11,
        route_color: 'ffe900',
        route_text_color: '000000'
      },
      { 
        route_id: 'TE6', 
        route_short_name: 'TE6', 
        route_long_name: 'Triaj - Șirul Beethoven',
        route_type: 3,
        route_color: '00a3e8',
        route_text_color: 'FFFFFF'
      },
    ]),
    
    getFirstAsync: jest.fn().mockResolvedValue({ 
        route_id: '1', 
        route_short_name: '1', 
        route_long_name: 'Triaj - Livada Poștei',
        route_type: 11,
        route_color: 'ffe900',
        route_text_color: '000000'
    }),
    
    closeAsync: jest.fn().mockResolvedValue(undefined),
    withTransactionAsync: jest.fn(async (task) => await task()),
  })),
}));

describe('Routes full integration', () => {

    test('Should render properly', async() => {

      await AsyncStorage.setItem(THEME_KEY, 'light');

        renderRouter(
        {
            '(tabs)/routes': () => <Routes />,
        },
        { initialUrl: '/(tabs)/routes', wrapper: ThemeProvider }
       );

       await screen.findByTestId('routes-layout');

       const routesLayout = screen.getByTestId('routes-layout');
       const routesFlattenedStyle = StyleSheet.flatten(routesLayout.props.style);

       expect(routesLayout).toBeOnTheScreen();
       expect(routesFlattenedStyle.backgroundColor).toBe('#FFFFFF');
       
    });

    test('Routes list should be displayed', async() =>{

       await AsyncStorage.setItem(THEME_KEY, 'light');

        renderRouter(
        {
            '(tabs)/routes': () => <Routes />,
        },
        { initialUrl: '/(tabs)/routes', wrapper: ThemeProvider }
       );
       
       expect( await screen.findByText('1')).toBeOnTheScreen();
       expect( await screen.findByText('Triaj - Livada Poștei')).toBeOnTheScreen();
       expect( await screen.findByText('TE6')).toBeOnTheScreen();
       expect( await screen.findByText('Triaj - Șirul Beethoven')).toBeOnTheScreen();

       const db = await openDatabaseAsync('gtfs_v1.db');

       await db.getAllAsync('SELECT * FROM routes ORDER BY CAST(route_short_name AS INTEGER), route_short_name');

       expect(openDatabaseAsync).toHaveBeenCalledWith('gtfs_v1.db')
       expect(db.getAllAsync).toHaveBeenCalledWith('SELECT * FROM routes ORDER BY CAST(route_short_name AS INTEGER), route_short_name');
    });
})