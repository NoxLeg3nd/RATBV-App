import { router } from 'expo-router';
import { View, Text, StyleSheet, Image, Pressable, Dimensions} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useContext } from 'react';
import { ThemeContext } from '../../customHooks/themeProvider';

const {width, height} = Dimensions.get("window");

const Home = () => {
  const { colors } = useContext(ThemeContext);

  return (
    <SafeAreaProvider>
      <View testID='home-layout' style={[homeStyles.homeView, {backgroundColor: colors.middleBackground}]}>
        <Image testID='bannerImage' style={homeStyles.coverImage} source={require("../../assets/coverphoto.jpg")} resizeMode='cover' />
        <Text style={[homeStyles.welcomeParagraph, {color: colors.paragraphText}]}>
          Welcome to the RATBV App!
        </Text>
          <Pressable testID='aboutButton' onPress={() => router.push('../about')} style={homeStyles.aboutPressable}>
            <Text style={homeStyles.aboutTitle}>About & info</Text>
          </Pressable>
      </View>
    </SafeAreaProvider> 
  );
}

export default Home;
const homeStyles = StyleSheet.create({
  
  homeView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "#005e05",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    width: '90%',
    top: "25%"

},
  aboutTitle: {
   fontWeight: "bold",
   color: "#FFFFFF"
  },

});
