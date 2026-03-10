import { getDB } from '../utils/db'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function About() {
    return (
        <SafeAreaProvider>
            <View style={aboutStyles.aboutView}>
                <Image style={aboutStyles.aboutImage} source={require("../assets/aboutgraphic.jpg")} resizeMode="contain"/>
                <View style={aboutStyles.aboutTextView}>
                    <Text></Text>
                </View>
            </View>
        </SafeAreaProvider>
    )
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
        }
    });