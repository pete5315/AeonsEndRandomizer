import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  View,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import CardImage from "../ReusableComponents/CardImage/CardImage";

const ImageModal = ({ image, isVisible, i, hideModal }) => {
  const dispatch = useDispatch();
  const closeModal = () => {
    console.log("close modal")
      dispatch({ type: "UNSET_MODAL_IMAGE" });  
  }
  // useEffect(() => {
  //     dispatch({ type: "UNSET_MODAL_IMAGE" });
  // }, []);

  console.log("image", image);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => closeModal()}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => closeModal()}
        // style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

import { Dimensions } from "react-native";

// Get the screen dimensions
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// Define the percentage of the screen you want to use
const imageWidthPercentage = 80; // Adjust this value as needed
const imageHeightPercentage = 57; // Adjust this value as needed

// Calculate the actual width and height using the percentages
const imageWidth = (windowWidth * imageWidthPercentage) / 100;
const imageHeight = (windowHeight * imageHeightPercentage) / 100;
const verticalBuffer = (windowHeight-imageHeight)/2.5;
const horizontalBuffer = (windowWidth-imageWidth)/2;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
  },
  image: {
    width: imageWidth,
    height: imageHeight,
    //   shadowOffset: {
    //     width: 0,
    //     height: 2,
    //   },
    //   shadowOpacity: 0.25,
    //   shadowRadius: 4,
    //   elevation: 5,
    // },
    // button: {
    //   borderRadius: 20,
    //   padding: 10,
    //   elevation: 2,
    // },
    // buttonOpen: {
    //   backgroundColor: "#F194FF",
    // },
    // buttonClose: {
    //   backgroundColor: "#2196F3",
    // },
    // textStyle: {
    //   color: "white",
    //   fontWeight: "bold",
    //   textAlign: "center",
    // },
    // modalText: {
    //   marginBottom: 15,
    //   textAlign: "center",
  },
  modalContent: {
    marginTop: verticalBuffer,
    marginLeft: horizontalBuffer,
    marginBottom: verticalBuffer,
  }
});

export default ImageModal;
