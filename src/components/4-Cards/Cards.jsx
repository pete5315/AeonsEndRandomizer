import * as React from "react";
import {
  View,
  Text,
  Animated,
  ScrollView,
  StyleSheet,
  FlatList,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const gems = require("../../../assets/gems.json");
const relics = require("../../../assets/relics.json");
const spells = require("../../../assets/spells.json");

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
  const renderItem = ({ item }) => {
    // Define conditional styles based on the trait
    // console.log("wave", item.wave);
    let renderWave = !(highestWave === item.wave);
    highestWave = item.wave;
    // console.log("Item wave:", item.wave);
    // console.log("Is wave included:", waveLabels.includes(item.wave));
    const itemStyle = {
      padding: 20,
      borderColor: "gray",
      borderBottomWidth: 1,
      backgroundColor: selectedSets[item.set] === true ? "blue" : "white", // Example: Apply blue background for items with trait "A"
    };
    return (
      <View>
        {renderWave && <Text>Wave {item.wave}</Text>}
        <TouchableOpacity
          style={itemStyle} // Apply the conditional styles here
          key={item.name}
          onPress={() => {
            // Update selected sets state based on the item's trait
            sendUpdate(item);
            console.log("You pressed a button", item);
          }}
        >
          <Text>
            {!renderWave && <Text> </Text>}
            {item?.name}
          </Text>
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
        <ScrollView contentContainerStyle={styles.container}>
        <FlatList
            data={gems}
            renderItem={renderItem}
            keyExtractor={(item) => item.set}
          />
          <FlatList
            data={relics}
            renderItem={renderItem}
            keyExtractor={(item) => item.set}
          />
          <FlatList
            data={spells}
            renderItem={renderItem}
            keyExtractor={(item) => item.set}
          />
        </ScrollView>
      </View>
    </FadeInView>
  );
}

const styles = StyleSheet.create({
  container: {},
});
