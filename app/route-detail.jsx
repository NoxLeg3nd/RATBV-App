import { View, Text, Image, FlatList, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { getDB } from "../utils/db";

export default function RouteDetail() {
    const {id} = useLocalSearchParams();
    const [db, setDb] = useState(null);
    const [stops, setStops] = useState(null);
    const [route, setRoute] = useState(null);
    const [direction, setDirection] = useState('0');

    useEffect(() => {
        getDB().then(setDb);
    }, [])

    useEffect(() => {
        if (!db) return;
        setStops(null);
        db.getAllAsync(`SELECT DISTINCT stops.stop_id, stops.stop_name, stop_times.stop_sequence
                        FROM stop_times
                                 JOIN stops ON stop_times.stop_id = stops.stop_id
                                 JOIN trips ON stop_times.trip_id = trips.trip_id
                        WHERE trips.route_id = ?
                          AND trips.trip_id = (
                            SELECT trip_id FROM trips WHERE route_id = ? AND direction_id = ? LIMIT 1
                        )
                        ORDER BY CAST(stop_times.stop_sequence AS INTEGER)
        `, [id, id, direction]).then(rows => setStops(rows));
    }, [db, direction]);

    useEffect(() => {
        if(!db) return;
        db.getFirstAsync(`SELECT * FROM routes WHERE route_id = ?`, [id]).then(row => setRoute(row));
    }, [db]);


    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <Pressable style={styles.orderPressable}>
                    <Text style={styles.orderPressableText} onPress={() => setDirection(direction === '0' ? '1' : '0')}>Change direction</Text>
                </Pressable>
                <Text style={styles.title}>Route {route?.route_short_name}: {route?.route_long_name}</Text>
                <View style={styles.stopsContainer}>
                    {stops === null ? (
                        <Text style={styles.title}>Loading...</Text>
                    ) : stops.length === 0 ? (
                        <Text style={styles.title}>Route does not have a return!</Text>
                    ) : <FlatList data={stops}
                                  keyExtractor={(item) => item.stop_id}
                                  renderItem={({ item, index }) => (
                                      <Pressable style={styles.stopPressable} onPress={() => router.push(`/stop/${item.stop_id}`)}>
                                          <View style={[styles.stopNumberView, {backgroundColor: `#${route?.route_color}`}]}>
                                              <Text style={[styles.stopNumber, {color: `#${route?.route_text_color}`}]}>{index+1}</Text>
                                          </View>
                                          <Text style={styles.stopName}>{item.stop_name}</Text>
                                      </Pressable>
                                  )}
                        />
                    }
                </View>
            </View>
        </SafeAreaProvider>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    orderPressable: {
        borderRadius: 5,
        backgroundColor: 'black',
        height: 'auto',
        paddingHorizontal: 10,
        paddingVertical: 10,
        margin: 10,

    },

    orderPressableText: {
        fontSize: 20,
        color: 'white',
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 15,
    },

    stopsContainer: {
        flex: 1,
        width: '100%',
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        paddingHorizontal: 15,
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

    stopNumber: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#999',
    },

    stopName: {
        fontSize: 16,
        flex: 1,

    },

    stopNumberView: {
        borderRadius: 6,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
    },

})