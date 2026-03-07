import { useEffect } from 'react';
import { View, Text } from 'react-native';
import * as SQLite from 'expo-sqlite';

async function loadAndQueryDB() {
  const dbName = "gtfs.db";

  const db = await SQLite.openDatabaseAsync(dbName, {
    assetSource: require("../../gtfs.db"),
  });

  const rows = await db.getAllAsync('SELECT * FROM agency');
  console.log("Agency:", rows);

  const rows1 = await db.getAllAsync('SELECT * FROM stop_times WHERE trip_id LIKE "1_Mo-Fr_LivadaPostei-Triaj_%" AND stop_sequence="1"');
  console.log("Ruta1:", rows1)
}

export default function Routes() {
  useEffect(() => { loadAndQueryDB(); }, []);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Check console for GTFS data</Text>
    </View>
  ); 
}