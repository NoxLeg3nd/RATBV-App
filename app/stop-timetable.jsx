import { View, Text, FlatList, Pressable, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { getDB } from '../utils/db';
import { useContext } from 'react';
import { ThemeContext } from '../customHooks/themeProvider';

export default function StopTimetable() {
  const { colors } = useContext(ThemeContext);
  const { stopId, routeId, directionId } = useLocalSearchParams();
  const [db, setDb] = useState(null);
  const [weekdayRows, setWeekdayRows] = useState([]);
  const [weekendRows, setWeekendRows] = useState([]);
  const [stopName, setStopName] = useState('');

  useEffect(() => {
    getDB().then(setDb);
  }, []);

  useEffect(() => {
    if (!db || !stopId) return;

    db.getFirstAsync(`SELECT stop_name FROM stops WHERE stop_id = ?`, [stopId])
        .then(row => setStopName(row?.stop_name ?? ''));

    db.getAllAsync(
        `
      SELECT DISTINCT
        substr(stop_times.departure_time,1,2) AS departure_hour,
        substr(stop_times.departure_time,4,2) AS departure_minute,
        trips.service_id
      FROM stop_times
      JOIN trips ON stop_times.trip_id = trips.trip_id
      WHERE stop_times.stop_id = ?
        AND trips.route_id = ?
        AND trips.direction_id = ?
      GROUP BY departure_hour, departure_minute, trips.service_id
      ORDER BY departure_hour, departure_minute
      `,
        [stopId, routeId, directionId]
    ).then(rows => {
      const weekdays = {};
      const weekends = {};

      rows.forEach(r => {
        const hour = r.departure_hour;

        if (r.service_id === 'Mo-Fr') {
          if (!weekdays[hour]) weekdays[hour] = [];
          weekdays[hour].push(r.departure_minute);
        }

        if (r.service_id === 'Sa-Su') {
          if (!weekends[hour]) weekends[hour] = [];
          weekends[hour].push(r.departure_minute);
        }
      });

      const toSortedRows = (grouped) =>
          Object.entries(grouped)
              .sort((a, b) => Number(a[0]) - Number(b[0]))
              .map(([hour, minutes]) => ({
                hour,
                minutes: minutes.sort((a, b) => Number(a) - Number(b)).join('  '),
              }));

      setWeekdayRows(toSortedRows(weekdays));
      setWeekendRows(toSortedRows(weekends));
    });
  }, [db, stopId, routeId, directionId]);

  const TimetableSection = ({ title, data, accentColor }) => (
      <View style={styles.section}>
        <View style={[styles.sectionHeader, { backgroundColor: accentColor }]}>
          <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>

        <View style={[styles.tableHeader, { backgroundColor: colors.middleBackground, borderColor: colors.routesBorder }]}>
          <Text style={[styles.headerHour, { color: colors.stopText }]}>HR</Text>
          <Text style={[styles.headerMinutes, { color: colors.stopText }]}>MINUTES</Text>
        </View>

        <FlatList
            data={data}
            keyExtractor={(item) => item.hour}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
                <View style={[
                  styles.row,
                  {
                    backgroundColor: index % 2 === 0 ? colors.routesButton : colors.middleBackground,
                    borderColor: colors.routesBorder,
                  }
                ]}>
                  <View style={[styles.hourCell, { borderColor: colors.routesBorder }]}>
                    <Text style={[styles.hourText, { color: accentColor }]}>{item.hour}</Text>
                  </View>
                  <Text style={[styles.minutesText, { color: colors.stopText }]}>{item.minutes}</Text>
                </View>
            )}
        />
      </View>
  );

  return (
      <SafeAreaProvider>
        <View style={[styles.container, { backgroundColor: colors.middleBackground }]}>

          <View style={styles.header}>
            <Pressable
                style={[styles.backButton, { backgroundColor: colors.routesButton, borderColor: colors.routesBorder }]}
                onPress={() => router.back()}
            >
              <Text style={[styles.backButtonText, { color: colors.routesText }]}>← Back</Text>
            </Pressable>
            <Text style={[styles.stopTitle, { color: colors.paragraphText }]} numberOfLines={2}>
              {stopName || 'Stop Timetable'}
            </Text>
          </View>

          <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
          >
            <TimetableSection
                title="Monday – Friday"
                data={weekdayRows}
                accentColor="#4A90D9"
            />
            <TimetableSection
                title="Saturday – Sunday"
                data={weekendRows}
                accentColor="#E07B4A"
            />
          </ScrollView>

        </View>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 12,
  },

  backButton: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },

  backButtonText: {
    fontSize: 15,
    fontWeight: '600',
  },

  stopTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 28,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 24,
  },

  section: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(128,128,128,0.2)',
  },

  sectionHeader: {
    paddingVertical: 10,
    paddingHorizontal: 14,
  },

  sectionHeaderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
  },

  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },

  headerHour: {
    width: 48,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 1,
  },

  headerMinutes: {
    flex: 1,
    paddingLeft: 12,
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 1,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  hourCell: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    alignSelf: 'stretch',
  },

  hourText: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  minutesText: {
    flex: 1,
    paddingLeft: 12,
    paddingVertical: 10,
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0.5,
  },
});