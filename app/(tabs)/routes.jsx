import { useEffect, useState } from 'react';
import { View , Text, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getDB } from '../../utils/db'

export default function Routes() {
  const [ db, setDb ] = useState(null);

  useEffect(() => {
    getDB().then(setDb);
  }, []);

  useEffect(() => {
    if(!db) return;
    db.getAllAsync('SELECT * FROM agency').then(console.log);
  }, [db])

  return (
    <SafeAreaProvider>
    <View style={routesStyles.routesView}>
      <Text style= {routesStyles.paragraph}>Check console for GTFS data</Text>
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