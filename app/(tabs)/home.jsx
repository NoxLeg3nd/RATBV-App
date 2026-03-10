import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function Home() {
  
  return (
    <SafeAreaProvider>
      <View style={homeStyles.homeView}>
        <Image style={homeStyles.decoImage} source={require("../../assets/ratbv.jpg")} resizeMode='contain'/>
        <Image style={homeStyles.coverImage} source={require("../../assets/coverphoto.jpg")} resizeMode="contain" />
        <Text style={homeStyles.welcomeParagraph}>
          Welcome to the RATBV App!
          </Text>
          <Text style={homeStyles.warningParagraph}> Note: This is the unofficial app version of the RATBV website and we do not take responsability for eventual casualties.</Text>
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
    position: 'absolute',
    fontFamily: "Comic sans",
    fontSize: 20,
    fontWeight: "bold",
  },

  warningParagraph: {
    flex: 2,
    position: 'relative',
    fontWeight: "bold",
    top: 230,
    textAlign: "center",
  },

  decoImage: {
    flex: 1,
    justifyContent: "center",
    position: 'relative',
    bottom: 45,
    height: 90,
    width: 120
  },

  coverImage: {
    flex: 2,
    position:'relative',
    width: "100%",
    height: 200,
    bottom: 100,
  }
});
