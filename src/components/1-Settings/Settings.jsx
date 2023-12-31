import { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
const sets = require("../../../assets/sets.json");
export default function Settings() {
  let highestWave = 0;
  const selectedSets = useSelector((store) => store.sets);
  const dispatch = useDispatch();

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
      backgroundColor: selectedSets[item.set] === true ? "lightblue" : "white", // Example: Apply blue background for items with trait "A"
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

  const sendUpdate = (item) => {
    console.log(35, item.set, !selectedSets[item.set]);
    dispatch({
      type: "UPDATE_SETS",
      payload: { set: item.set, setProp: !selectedSets[item.set] },
    });
    dispatch({
      type: "UNSET_MARKET",
    });
    dispatch({ type: "SET_MARKET_IS_LOADING" });
  };

  return (
    <View>
      <Text> </Text>
      <Text> </Text>
      <FlatList
        data={sets}
        renderItem={renderItem}
        keyExtractor={(item) => item.set}
      />
      <Text>Options! </Text>
    </View>
  );
}
