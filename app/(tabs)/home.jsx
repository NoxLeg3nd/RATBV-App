import { router } from 'expo-router';
import { View, Text, StyleSheet, Image, Pressable, Dimensions} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const {width, height} = Dimensions.get("window");

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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: "10%"
  },

  decoImage: {
    justifyContent: "center",
    alignItems: "center",
    bottom: "25%",
    height: 90,
    width: 120,
  },

  coverImage: {
    backgroundColor: "green",
    width: width,
    height: height > 400 ? 150 : 200,
    bottom:"25%"
  },

  aboutPressable: {
    position: "relative",
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    bottom: "-20%",
    width: '90%',

},
  aboutTitle: {
   fontWeight: "bold",
   color: "white",
  },

});
