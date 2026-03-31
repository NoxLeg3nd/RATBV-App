import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import { useCallback, useContext, useState } from 'react';
import { ThemeContext } from '../../customHooks/themeProvider';
import { getFavourites, removeFavourite } from "../../utils/favourites";
import { router, useFocusEffect } from "expo-router";
import { useFavourites } from '../../customHooks/favouritesProvider';

export default function Favourites() {
  const { colors } = useContext(ThemeContext);
  const { setFavouriteIds } = useFavourites();
  const [ favourites, setFavourites ] = useState([]);

  useFocusEffect(
      useCallback(() => {
        getFavourites().then(setFavourites);
      }, [])
  );

  const handleRemove = async (stopId) => {
    await removeFavourite(stopId);
    const updatedFavourites = favourites.filter(stop => stop.stop_id !== stopId);
    setFavourites(updatedFavourites);
    setFavouriteIds(updatedFavourites.map(f => String(f.stop_id)));
  };

  return (
      <View style={[styles.container, { backgroundColor: colors.middleBackground }]}>
        <View style={[styles.stopsContainer, { backgroundColor: colors.middleBackground }]}>
          {favourites.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>🤍</Text>
                <Text style={[styles.emptyText, { color: colors.paragraphText }]}>No favourites yet</Text>
                <Text style={[styles.emptySubText, { color: colors.paragraphText }]}>
                  Press ❤️ on any stop in a route to save it here
                </Text>
              </View>
          ) : (
              <FlatList
                  data={favourites}
                  keyExtractor={(item) => item.stop_id}
                  renderItem={({ item, index }) => (
                      <Pressable
                          style={[styles.stopPressable, { backgroundColor: colors.routesButton }]}
                          onPress={() => router.push(`/stop-timetable?stopId=${item.stop_id}&routeId=${item.route_id}&directionId=${item.direction_id}`)}
                      >
                        <View style={[styles.stopNumberView, { backgroundColor: `#${item.route_color}` }]}>
                          <Text style={[styles.stopNumber, { color: `#${item.route_text_color}` }]}>{item.route_id}</Text>
                        </View>
                        <View style={styles.stopInfo}>
                          <Text style={[styles.stopName, { color: colors.stopText }]} numberOfLines={1}>{item.stop_name}</Text>
                          <Text style={[styles.routeLabel, { color: colors.paragraphText }]}>Route {item.route_id}</Text>
                        </View>
                        <Pressable onPress={() => handleRemove(item.stop_id)} style={styles.heartButton}>
                          <Text style={styles.heartIcon}>❤️</Text>
                        </Pressable>
                      </Pressable>
                  )}
              />
          )}
        </View>

      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 15,
    marginTop: 50,
  },

  stopsContainer: {
    flex: 1,
    width: '100%',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: 15,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 32,
  },

  emptyIcon: {
    fontSize: 48,
    marginBottom: 8,
  },

  emptyText: {
    fontSize: 18,
    fontWeight: '600',
  },

  emptySubText: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: 'center',
  },

  stopPressable: {
    borderColor: 'black',
    borderRadius: 6,
    borderWidth: 1,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },

  stopNumberView: {
    borderRadius: 6,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },

  stopNumber: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  stopInfo: {
    flex: 1,
    gap: 2,
  },

  stopName: {
    fontSize: 16,
    fontWeight: '500',
  },

  routeLabel: {
    fontSize: 12,
    opacity: 0.7,
  },

  heartButton: {
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  heartIcon: {
    fontSize: 20,
  },
});