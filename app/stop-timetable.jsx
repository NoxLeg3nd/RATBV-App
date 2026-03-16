import { View, Text, FlatList, Pressable, StyleSheet,ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { getDB } from '../utils/db';

export default function StopTimetable() {

  const { stopId } = useLocalSearchParams();
  const [db, setDb] = useState(null);
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    getDB().then(setDb);
  }, []);

  useEffect(() => {

    if (!db || !stopId) return;

    db.getAllAsync(
      `
      SELECT
        substr(stop_times.departure_time,1,2) AS departure_hour,
        substr(stop_times.departure_time,4,2) AS departure_minute,
        trips.service_id
      FROM stop_times
      JOIN trips ON stop_times.trip_id = trips.trip_id
      WHERE stop_times.stop_id = ?
      ORDER BY departure_hour, departure_minute
      `,
      [stopId]
    ).then(rows => {

      const grouped = {};

      rows.forEach(r => {

        const hour = r.departure_hour;

        if (!grouped[hour]) {
          grouped[hour] = {
            hour,
            weekdays: [],
            weekends: []
          };
        }

        if (r.service_id === 'Mo-Fr') {
          grouped[hour].weekdays.push(r.departure_minute);
        }

        if (r.service_id === 'Sa-Su') {
          grouped[hour].weekends.push(r.departure_minute);
        }

      });

      const table = Object.values(grouped)
        .sort((a,b)=>Number(a.hour)-Number(b.hour))
        .map(row => ({
          hour: row.hour,
          weekdays: row.weekdays
            .sort((a,b)=>Number(a)-Number(b))
            .join(' '),
          weekends: row.weekends
            .sort((a,b)=>Number(a)-Number(b))
            .join(' ')
        }));

      setTimetable(table);

    });

  }, [db, stopId]);

    return (
  <SafeAreaProvider>
    <View style={timetableStyles.tableView}>

      <Pressable
        style={timetableStyles.tableButton}
        onPress={() => router.back()}
      >
        <Text>Go back</Text>
      </Pressable>

      <Text style={timetableStyles.tableTitle}>Stop Timetable</Text>

      <View style={timetableStyles.container}>

        <View style={timetableStyles.firstRow}>
          <Text style={{flex:1, textAlign:'center', marginLeft: 10}}>MONDAY-FRIDAY</Text>
          <Text style={{flex:1, textAlign:'center'}}>SATURDAY-SUNDAY</Text>
        </View>

        <View style={timetableStyles.firstRow}>
          <View style={{flex:1, flexDirection:'row'}}>
            <Text style={{width:40}}>HOUR</Text>
            <Text style={{flex:1, marginLeft: 110}}>MINUTES</Text>
          </View>
        </View>
      
        <FlatList
          data={timetable}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (

            <View style={timetableStyles.table}>

          
              <View style={{flex:1, flexDirection:'row', borderBottomWidth: 2, borderBottomColor: 'black', borderRightWidth:2, borderRightColor:'black'}}>
                <Text style={{width:40}}>{item.hour}</Text>
                <Text style={{flex:1}}>{item.weekdays}</Text>
              </View>

              <View style={{flex:1, flexDirection:'row', borderBottomWidth: 2, borderBottomColor: 'black'}}>
                <Text style={{flex:1, marginLeft: 25}}>{item.weekends}</Text>
              </View>

            </View>

          )}
        />
      </View>

    </View>
  </SafeAreaProvider>
);

}

const timetableStyles = StyleSheet.create({

  tableView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container:{
    width: "90%",
    maxHeight: "85%",
    borderWidth:2,
    borderColor: "black",
  },

  tableTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },

  tableButton: {
    borderWidth: 2,
    width: 70,
    height: 30,
    marginTop: 35,
    marginRight: 300,
    backgroundColor: '#40f877',
    justifyContent: 'center',
    alignItems: 'center',
  },

  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },

  table: {
    flexDirection: 'row',
  },

  column: {
    flex: 1,
    flexDirection: 'column',
  }

});