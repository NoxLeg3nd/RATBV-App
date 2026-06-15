import { router } from 'expo-router';
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
           <Pressable style={[ aboutStyles.backButton, { backgroundColor: colors.routesButton, borderColor: colors.routesBorder }]} onPress={() => router.back()}>
                    <Text style={[ aboutStyles.backButtonText, { color: colors.routesText }]}>← Back</Text>
            </Pressable>
            <Image testID='aboutGraphic' style={aboutStyles.headerImage} source={require("../assets/aboutgraphic.jpg")} resizeMode="cover"/>
            <View style={aboutStyles.content}>
                <Pressable testID='url' onPress={() => Linking.openURL(agency?.agency_url)}>
                    <Text style={[aboutStyles.link, aboutStyles.text]}> <Text style={[ {color: colors.paragraphText}]}>Link:</Text> {agency?.agency_url}</Text>
                </Pressable>
                <Pressable testID='phone' onPress={() => Linking.openURL(`tel:${agency?.agency_phone?.replace(/\s/g, '')}`)}>
                    <Text style={[aboutStyles.link, aboutStyles.text]}><Text style={[ {color: colors.paragraphText}]}>Phone:</Text> {agency?.agency_phone}</Text>
                </Pressable>
                <Pressable testID='email' onPress={() => Linking.openURL(`mailto:${agency?.agency_email}`)}>
                    <Text style={[aboutStyles.link, aboutStyles.text]}><Text style={[ {color: colors.paragraphText}]}>E-mail:</Text> {agency?.agency_email}</Text>
                </Pressable>
                <Text style={[aboutStyles.text, {color: colors.paragraphText}]}>România, Brașov</Text>
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

    backButton: {
       alignSelf: 'flex-start',
       borderWidth: 2,
       borderRadius: 50,
       height: 'auto',
       paddingHorizontal: 14,
       paddingVertical: 5,
       width: 'fit-content',
       marginLeft: 10,
       top: "5%"
    },

    backButtonText:{
        textAlignVertical: 'center',
        fontSize: 14,
        fontWeight: 'bold'
    },
    headerImage: {
        width: '100%',
        height: 200,
        marginTop: '25%'
    },

    content: {
        alignItems: 'center',
        marginTop: "25%",
        width: '90%',
    },

    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 5,
        textAlign: 'center',
    },

    link: {
        color: '#4355ff',
        textDecorationLine: 'none',
    },

});