import React, { useEffect, useState } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";

const ImageMap = ({ redraw }) => {
  const market = useSelector((store) => store.market);
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    if (refreshFlag) {
      // Implement any additional logic you need here
      console.log("Component is refreshed");
    }
  }, [refreshFlag]);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {market?.map((image, i) => (
        <View style={styles.item} key={image.name}>
          <Image
            source={{ uri: image.image }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.textFont}>
            {image.name} {image?.cost}
          </Text>
            <Button
              title="redraw"
              onPress={() => {
                console.log("whoo, an button");
                redraw(i);
                setRefreshFlag(!refreshFlag); // Toggle the state to trigger a re-render

              }}
            >
            </Button>
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
