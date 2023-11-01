import { useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RandomMarket from "./2-RandomMarket";

export default function Market() {
  const dispatch = useDispatch();
  const hideModal = () => {
    console.log("COME ON NOW")
    dispatch({ type: "UNSET_MODAL_IMAGE" });
  };
  const modalImage = useSelector((store) => store.modalImage);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "#95a5a6",
      }}
    >
      {/* {modalImage?.isShown ? ( */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => hideModal()}
          style={styles.overlay}
        >
          <View>
            <Text>Market cards! </Text>
            <RandomMarket />
          </View>
        </TouchableOpacity>
      {/* ) : (
        <View>
          <Text>Market cards! </Text>
          <RandomMarket />
        </View>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  image: {
    // flex: 1,
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
});
