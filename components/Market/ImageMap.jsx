import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

const Images = [
  { name: "Crystal", uri: require("../../assets/Crystal.webp") },
  { name: "Crystal", uri: require("../../assets/Crystal.webp") },
  { name: "Crystal", uri: require("../../assets/Crystal.webp") },
  { name: "Crystal", uri: require("../../assets/Crystal.webp") },
  { name: "Crystal", uri: require("../../assets/Crystal.webp") },
  { name: "Crystal", uri: require("../../assets/Crystal.webp") },
  { name: "Crystal", uri: require("../../assets/Crystal.webp") },
  { name: "Crystal", uri: require("../../assets/Crystal.webp") },
  { name: "Crystal", uri: require("../../assets/Crystal.webp") },
];

const ImageMap = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Images.map((icons) => (
        <View style={styles.item} key={icons.name}>
          <Image source={icons.uri} style={styles.image} resizeMode="contain" />
          <Text style={styles.textFont}>{icons.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  item: {
    width: "25%", // Adjust the width to create a 3x3 grid
    margin: 10,
    alignItems: 'center',
  },
  image: {
    width: 160,
    height: 160,
  },
  textFont: {
    fontSize: 12,
    textAlign: "center",
  },
});

export default ImageMap;
