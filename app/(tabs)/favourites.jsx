import { View, Text, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../../customHooks/themeProvider';

export default function Favourites() {
   const { colors } = useContext(ThemeContext);
  return (
    <View style={[favouritesStyles.favouritesView, {backgroundColor: colors.middleBackground}]}>
      <Text style={[favouritesStyles.paragraph, {color: colors.paragraphText}]}>Favourites</Text>
    </View>
  );
}

const favouritesStyles = StyleSheet.create({
  
  favouritesView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  paragraph: {
    flex: 1,
    top: 50,
    paddingTop: 150,
    fontSize: 20,
    fontWeight: "bold",
  }
});