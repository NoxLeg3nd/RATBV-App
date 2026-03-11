import { router } from 'expo-router';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Home() {
  
  return (
    <SafeAreaProvider>
      <View style={homeStyles.homeView}>
        <Image style={homeStyles.decoImage} source={require("../../assets/ratbv.jpg")} resizeMode='contain'/>
        <Image style={homeStyles.coverImage} source={require("../../assets/coverphoto.jpg")} resizeMode='cover' />
        <Text style={homeStyles.welcomeParagraph}>
          Welcome to the RATBV App!
        </Text>
          <Pressable onPress={() => router.push('../about')} style={homeStyles.aboutPressable}>
            <Text style={homeStyles.aboutTitle}>About & info</Text>
          </Pressable>
      </View>
    </SafeAreaProvider> 
  );
}

const homeStyles = StyleSheet.create({
  
  homeView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFF",
  },

  welcomeParagraph: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },

  decoImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    bottom: 45,
    height: 90,
    width: 120,
  },

  coverImage: {
    flex: 1,
    backgroundColor: "green",
    alignContent: "flex-start",
    width: 400,
    height: '100%',
    bottom: 45
  },

  aboutPressable: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 20,
    width: '90%',

},
  aboutTitle: {
   fontWeight: "bold",
   color: "white",
  },

});
