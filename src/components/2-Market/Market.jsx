import { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import RandomMarket from "./RandomMarket";

export default function Market() {
  return (
    <View         style={{
      flex: 1,
      justifyContent: "center",
      // alignItems: "center",
      backgroundColor: "#95a5a6",
    }}>
      <Text>Market cards! </Text>
      <RandomMarket />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  image: {
    // flex: 1,
    width: 150,
    height: 150,
    resizeMode: 'contain',
}
});