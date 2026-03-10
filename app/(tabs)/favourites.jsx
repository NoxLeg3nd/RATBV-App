import { View, Text, StyleSheet } from 'react-native';




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