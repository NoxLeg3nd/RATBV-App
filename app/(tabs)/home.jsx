import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Home() {
  return (
    <SafeAreaProvider>
      <View style={homeStyles.homeView}>
        <Text style={homeStyles.paragraph}>Welcome</Text>
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

  paragraph: {
    flex: 1,
    top: 50,
    paddingTop: 150,
    fontSize: 20,
    fontWeight: "bold",
  }
});