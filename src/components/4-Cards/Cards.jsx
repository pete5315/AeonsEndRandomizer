import * as React from "react";
import {
  View,
  Text,
  Animated,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const gems = require("../../../assets/gems.json");
const relics = require("../../../assets/relics.json");
const spells = require("../../../assets/spells.json");
const list = [...gems, ...relics, ...spells].sort((a, b) => a.name.localeCompare(b.name))

import ImageModal from "../ReusableComponents/ImageModal/ImageModal";
import { useDispatch, useSelector } from "react-redux";

const FadeInView = (props, { navigation }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  

  useFocusEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    return () => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    };
  });

  return (
    <Animated.View // Special animatable View
      style={{
        flex: 1,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

export default function Cards() {
  const dispatch = useDispatch();

  const modalImage = useSelector((store) => store.modalImage);
  const [textInput, handleTextInput] = React.useState("");

  const filteredList = list.filter((item) =>
  item.name.toLowerCase().includes(textInput.toLowerCase())
);  const showModal = (image, i) => {
    console.log(30, image, modalImage);
    dispatch({ type: "SET_MODAL_IMAGE", payload: { image, i } });
  };

  const hideModal = () => {
    console.log("3-image, hiding modal");
    dispatch({ type: "HIDE_MODAL", payload: "3-ImageMap" });
  };

  const renderItem = ({ item }) => {
    // Define conditional styles based on the trait
    // console.log("wave", item.wave);
    // console.log("Item wave:", item.wave);
    // console.log("Is wave included:", waveLabels.includes(item.wave));
    const itemStyle = {
      padding: 20,
      borderColor: "gray",
      borderBottomWidth: 1,
    };
    return (
      <View>
        <TouchableOpacity
          style={itemStyle} // Apply the conditional styles here
          key={item.name}
          onPress={() => {
            console.log("You pressed a button", item);
            showModal(item.image);
          }}
        >
          <Text>{item?.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FadeInView>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          // alignItems: "center",
          backgroundColor: "#95a5a6",
        }}
      >
        {modalImage?.isShown && (
          <ImageModal
            image={modalImage.image}
            isVisible={true}
            hideModal={() => hideModal()}
          />
        )}
        <Text>Search</Text>
          <Text> </Text>
        <TextInput
          style={styles.input}
          placeholder="Search"
          onChangeText={handleTextInput}
          value={textInput}

        ></TextInput>
        <FlatList
          data={filteredList}
          renderItem={renderItem}
          keyExtractor={(item, set) => item.name+item.set}
          style={styles.list}
        />
      </View>
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  container: {},
  input: {

  },
  list: {
    backgroundColor: "rgba(255,255,255,0.5)",
  }
});
