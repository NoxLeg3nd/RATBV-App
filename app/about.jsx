import { useEffect, useState } from 'react';
import { getDB } from '../utils/db';
import { View, Text, StyleSheet, Image, Pressable, Linking, ScrollView } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../customHooks/themeProvider';

export default function About() {
    const { colors } = useContext(ThemeContext); 

    const [db, setDb] = useState(null);
    const [agency, setAgency] = useState(null);

    useEffect(() => {
        getDB().then(setDb);
    }, []);

    useEffect(() => {
        if (!db) return;
        db.getFirstAsync('SELECT * FROM agency').then(row => setAgency(row));
    }, [db]);

    return (
        <ScrollView testID='aboutView' contentContainerStyle={[aboutStyles.container, {backgroundColor: colors.middleBackground}]}>
            <Image
                testID='aboutGraphic'
                style={aboutStyles.headerImage}
                source={require("../assets/aboutgraphic.jpg")}
                resizeMode="contain"
            />

            <View style={aboutStyles.content}>
                <Image
                    testID='coverImage'
                    style={aboutStyles.logo}
                    source={require("../assets/ratbv.jpg")}
                    resizeMode="contain"
                />

                <Pressable testID='url' onPress={() => Linking.openURL(agency?.agency_url)}>
                    <Text style={[aboutStyles.link, aboutStyles.text]}>{agency?.agency_url}</Text>
                </Pressable>

                <Pressable testID='phone' onPress={() => Linking.openURL(`tel:${agency?.agency_phone?.replace(/\s/g, '')}`)}>
                    <Text style={[aboutStyles.link, aboutStyles.text]}>Phone: {agency?.agency_phone}</Text>
                </Pressable>

                <Pressable testID='email' onPress={() => Linking.openURL(`mailto:${agency?.agency_email}`)}>
                    <Text style={[aboutStyles.link, aboutStyles.text]}>E-mail: {agency?.agency_email}</Text>
                </Pressable>

                <Text style={aboutStyles.text}>România, Brașov</Text>
            </View>
        </ScrollView>
    );
}

const aboutStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
    },

    headerImage: {
        width: '100%',
        height: 200,
    },

    content: {
        alignItems: 'center',
        marginTop: 20,
        width: '90%',
    },

    logo: {
        width: '50%',
        height: 80,
        marginBottom: 20,
    },

    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 5,
        textAlign: 'center',
    },

    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
});