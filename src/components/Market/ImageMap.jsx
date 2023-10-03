import React, { useEffect } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";

const ImageMap = ({ redraw }) => {
  let Market = useSelector((store) => store.market);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Market?.map((image, i) => (
        <View style={styles.item} key={image.name}>
          <Image
            source={{ uri: image.image }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.textFont}>
            {image.name} {image?.cost}
          </Text>
          <TouchableOpacity
            style={{ padding: 20, borderColor: "gray", borderBottomWidth: 1 }}
            onPress={() => {
              console.log("whoo, a button");
              redraw(i);
            }}
          >
            <Button title="redraw">Reroll</Button>
          </TouchableOpacity>
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
    alignItems: "center",
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
