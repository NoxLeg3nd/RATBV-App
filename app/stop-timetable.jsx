import { View, Text, FlatList, Pressable, StyleSheet,ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { getDB } from '../utils/db';
import { useContext } from 'react';
import { ThemeContext } from '../customHooks/themeProvider';

export default function StopTimetable() {

  const {colors} = useContext(ThemeContext);

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
      SELECT DISTINCT
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
    <View style={[timetableStyles.tableView, {backgroundColor: colors.middleBackground}]}>
      <Pressable style={timetableStyles.tableButton} onPress={() => router.back()}>
        <Text>Go back</Text>
      </Pressable>
      <Text style={[timetableStyles.tableTitle, {color: colors.stopText}]}>Stop Timetable</Text>
      <View style={[timetableStyles.container, {borderColor: colors.routesBorder}]}>
        <View style={[timetableStyles.firstRow, {borderColor: colors.routesBorder}]}>
          <Text style={[timetableStyles.weekdayTextStyle, {borderColor: colors.routesBorder, color: colors.stopText}]}>MONDAY-FRIDAY</Text>
          <Text style={[timetableStyles.weekendTextStyle, {borderColor: colors.routesBorder, color: colors.stopText}]}>SATURDAY-SUNDAY</Text>
        </View>
        <View style={[timetableStyles.firstRow, {borderColor: colors.routesBorder}]}>
          <View style={timetableStyles.hourAndMinutesContainer}>
            <Text style={[timetableStyles.displayHourText, {borderColor: colors.routesBorder, color: colors.stopText}]}>HOUR</Text>
            <Text style={[timetableStyles.displayMinuteText, {color: colors.stopText}]}>MINUTES</Text>
          </View>
        </View>
        <FlatList
          data={timetable}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={timetableStyles.table}>
              <View style={[timetableStyles.displayDataContainer, {borderColor: colors.routesBorder}]}>
                <Text style={[timetableStyles.displayHourData, {borderColor: colors.routesBorder, color: colors.stopText}]}>{item.hour}</Text>
                <Text style={[timetableStyles.displayWeekdayMinutesData, {color: colors.stopText }]}>{item.weekdays}</Text>
              </View>
              <View style={[timetableStyles.displayWeekendMinutesContainer, {borderColor: colors.routesBorder}]}>
                <Text style={[timetable.displayWeekendMinutesData, {borderColor: colors.routesBorder, color: colors.stopText}]}>{item.weekends}</Text>
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
    width: "85%",
    maxHeight: "70%",
    borderWidth:2,
  },

  tableTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },

  tableButton: {
    position:"absolute",
    borderWidth: 2,
    width: 70,
    height: 30,
    marginRight: 300,
    marginBottom: 700,
    backgroundColor: '#40f877',
    justifyContent: 'center',
    alignItems: 'center'
  },

  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
  },

  table: {
    flexDirection: 'row',
  },

  column: {
    flex: 1,
    flexDirection: 'column',
  },

  weekdayTextStyle: {
    flex:1, 
    textAlign:'center',
    fontWeight:'bold', 
    borderLeftWidth: 2,
    marginLeft: 38.5,
  },

  weekendTextStyle: {
    flex:1,
    textAlign:'center', 
    fontWeight:'bold',
    borderLeftWidth: 2,
    marginRight: 42,
  },

  hourAndMinutesContainer: {
    flex:1, 
    flexDirection:'row'
  },

  displayHourText: {
    width:40, 
    textAlign: 'center',
    fontWeight:'bold',  
    borderRightWidth:2, 
  },

   displayMinuteText: {
    flex:1, 
    textAlign:'center',
    marginRight: 35, 
    fontWeight:'bold'
   },

   displayDataContainer: {
     flex:1, 
     flexDirection:'row', 
     borderBottomWidth: 2,  
     borderRightWidth:2, 
   },
   
   displayHourData: {
     width:40,  
     borderRightWidth:2, 
   },

   displayWeekdayMinutesData: {
      flex:1
   },

   displayWeekendMinutesContainer: {
     flex:1, 
     flexDirection:'row', 
     borderBottomWidth: 2,
   },

   displayWeekendMinutesData: {
     flex:1, 
     flexDirection:'row', 
     borderBottomWidth: 2, 
   }
});