import React, { useEffect, useState } from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import CardImage from "../ReusableComponents/CardImage/CardImage";
import ImageModal from "./4-ImageModal";

const ImageMap = ({ redraw, isLoading }) => {
  const market = useSelector((store) => store.market);
  const selectedSets = useSelector((store) => store.sets);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const modalImage = useSelector((store) => store.modalImage);

  const showModal = (image, i) => {
    console.log(30, image, modalImage);
    dispatch({ type: "SET_MODAL_IMAGE", payload: {image, i} });
  };

  const hideModal = () => {
    console.log("3-image, hiding modal");
    dispatch({ type: "HIDE_MODAL", payload: "3-ImageMap" });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (refreshFlag) {
      setTimeout(() => setRefreshFlag(!refreshFlag), 300);
      setRefreshFlag(isLoading);
    }
  }, []);

  const redrawPress = (i) => {
    console.log("whoo, an button");
    console.log(selectedSets);
    dispatch({
      type: "REDRAW_CARD",
      payload: { iterator: i, market, selectedSets },
    });
    setRefreshFlag(!refreshFlag);
  };

  console.log("is shown?", modalImage?.isShown);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {market?.map((image, i) => (
        <View style={styles.item} key={image.name}>
          {modalImage?.isShown && modalImage?.i === i && (
            <ImageModal
              image={modalImage.image}
              isVisible={true}
              hideModal={() => hideModal()}
            />
          )}
          {modalImage?.isShown ? (
            <TouchableOpacity
              onPress={() => {
                showModal(image.image, i);
              }}
            >
              <CardImage image={image.image} style={styles.image} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                showModal(image.image, i);
              }}
            >
              <CardImage image={image.image} style={styles.image} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              redrawPress(i);
            }}
            style={styles.redrawButton}
          >
            <Text style={styles.redrawButtonText}>Redraw</Text>
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
    alignItems: "center",
    marginTop: 30,
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
  redrawButton: {
    backgroundColor: 'rgba(55, 155, 255, 0.5)', // Set the background color to your desired color
    borderRadius: 10, // Set the border radius for rounded edges
    padding: 10, // Add padding to the button for spacing
    justifyContent: 'center', // Center the text horizontally
    alignItems: 'center', // Center the text vertically
    margin: 10,
  },
  redrawButtonText: {
    color: 'rgba(255, 255, 220, 0.5)', // Set the text color
    fontSize: 16, // Set the font size
    fontWeight: 'bold', // Set the font weight
  },
});

export default ImageMap;