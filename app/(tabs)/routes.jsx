import { router } from 'expo-router';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from "react";
import { getDB } from "../../utils/db";
import { useContext } from 'react';
import { ThemeContext } from '../../customHooks/themeProvider';

export default function Routes() {
  const { colors } = useContext(ThemeContext);

  const [db, setDb] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    getDB().then(setDb);
  }, []);

  useEffect(() => {
    if (!db) return;
    db.getAllAsync('SELECT * FROM routes ORDER BY CAST(route_short_name AS INTEGER), route_short_name')
        .then(rows => setData(rows));
  }, [db]);

  return (
      <SafeAreaProvider>
        <View style={[routesStyles.routesView, {backgroundColor: colors.middleBackground}]}>
          <FlatList
              data={data}
              keyExtractor={item => item.route_id}
              renderItem={({ item }) => (
                  <Pressable
                      style={routesStyles.routeItem}
                      onPress={() => router.push(`/route-detail?id=${item.route_id}`)}
                  >
                    <View style={[routesStyles.routeInner, { backgroundColor: `#${item.route_color}` }]}>
                      <View style={[routesStyles.routeNumberBox, { backgroundColor: 'rgba(0,0,0,0.2)' }]}>
                        <Text style={[routesStyles.routeNumber, { color: `#${item.route_text_color}` }]}>
                          {item.route_short_name}
                        </Text>
                      </View>
                      <Text style={[routesStyles.routeName, { color: `#${item.route_text_color}` }]}>
                        {item.route_long_name}
                      </Text>
                    </View>
                  </Pressable>
              )}
          />
        </View>
      </SafeAreaProvider>
  );
}

const routesStyles = StyleSheet.create({
  routesView: {
    flex: 1,
  },

  routeItem: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },

  routeInner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 12,
  },

  routeNumber: {
    fontWeight: 'bold',
    fontSize: 22,
    width: 60,
  },

  routeName: {
    fontSize: 14,
    flex: 1,
  },

  routeNumberBox: {
    borderRadius: 6,
    padding: 6,
    marginRight: 12,
    minWidth: 50,
    alignItems: 'center',
  },
});