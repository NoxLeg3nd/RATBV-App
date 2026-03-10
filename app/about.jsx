import { useEffect, useState } from 'react';
import { getDB } from '../utils/db';
import { View, Text, StyleSheet, Image, Pressable, Linking } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function About() {
  const [db, setDb] = useState(null);
  const [agency, setAgency] = useState(null);

  useEffect(() => {
    getDB().then(setDb);
  }, []);

  useEffect(() => {
    if (!db) return;
    db.getFirstAsync('SELECT * FROM agency')
      .then(row => setAgency(row));
  }, [db]);

  return (
    <SafeAreaProvider>
      <View style={aboutStyles.aboutView}>
        <Image style={aboutStyles.aboutImage} source={require("../assets/aboutgraphic.jpg")} resizeMode="contain"/>
        <View style={aboutStyles.aboutTextView}>
          <Text style={aboutStyles.aboutText}>{agency?.agency_name}</Text>
          <Pressable onPress={() => Linking.openURL(agency?.agency_url)}>
            <Text style={[aboutStyles.aboutLink, aboutStyles.aboutText]}>{agency?.agency_url}</Text>
          </Pressable>
          <Pressable onPress={() => Linking.openURL(`tel:${agency?.agency_phone.replace(/\s/g, '')}`)}>
            <Text style={[aboutStyles.aboutLink, aboutStyles.aboutText]}>Phone: {agency?.agency_phone}</Text>
          </Pressable>
          <Pressable onPress={() => Linking.openURL(`mailto:${agency?.agency_email}`)}>
            <Text style={[aboutStyles.aboutLink, aboutStyles.aboutText]}>E-mail: {agency?.agency_email}</Text>
          </Pressable>
          <Text style={aboutStyles.aboutText}>România, Brașov</Text>
        </View>
      </View>
    </SafeAreaProvider>
  );
}
const aboutStyles = StyleSheet.create({

        aboutView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'green',
        },

        aboutImage: {
            flex: 1,
            width: '100%',
            bottom: 100,
            backgroundColor: 'red'
        },

        aboutTextView: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'green'
        },
        
        aboutText: {
            fontSize: 20,
            fontWeight: 'bold',
        },

        aboutLink: {
            color: 'blue',
            textDecorationLine: 'underline',
        }
    });