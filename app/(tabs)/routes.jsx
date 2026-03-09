import { useEffect } from 'react';
import { View , Text, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SQLite from 'expo-sqlite';

async function loadAndQueryDB() {
  const dbName = "gtfs.db";

  const db = await SQLite.openDatabaseAsync(dbName, {
    assetSource: require("../../gtfs.db"),
  });

  const rows = await db.getAllAsync('SELECT * FROM agency');
  console.log("Agency:", rows);

  const rows1 = await db.getAllAsync('SELECT * FROM stop_times WHERE trip_id LIKE "1_Mo-Fr_LivadaPostei-Triaj_%" AND stop_sequence="1"');
  console.log("Ruta1:", rows1);
}

export default function Routes() {
  useEffect(() => { loadAndQueryDB(); }, []);

  return (
    <SafeAreaProvider>
    <View style={routesStyles.routesView}>
      <Text style= {routesStyles.paragraph}>Check console for GTFS data</Text>
      <Text style= {routesStyles.paragraph}>Agency ID</Text>
    </View>
    </SafeAreaProvider>
  ); 
}

const routesStyles = StyleSheet.create({
  
  routesView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFF",
  },

  paragraph: {
    flex: 1,
    top: 50,
    paddingTop: 150,
    fontSize: 20,
    fontWeight: "bold",
  }, 


});