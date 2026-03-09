<<<<<<< HEAD
import { View, Text, StyleSheet } from 'react-native';
=======
import { View, Text } from 'react-native';
import { Appearance, UseColorScheme } from 'react-native/types_generated/index';
>>>>>>> 50ef7d8b452426ce3c1a767151e1afd3deae63b3

export default function Favourites() {
  return (
    <View style={favouritesStyles.favouritesView}>
      <Text style={favouritesStyles.paragraph}>Favourites</Text>
    </View>
  );
}

const favouritesStyles = StyleSheet.create({
  
  favouritesView: {
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