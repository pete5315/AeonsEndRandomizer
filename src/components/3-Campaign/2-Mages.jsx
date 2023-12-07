import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "../../../node_modules/@react-native-picker/picker";

export default function Mages() {
  const [playerCount, setPlayerCount] = useState("2");

  const playerCounts = ["1", "2", "3", "4"];

  const updatePlayerCount = (itemValue) => {
    console.log("update player count");
    setPlayerCount(itemValue);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select a Number:</Text>
      <Picker
        selectedValue={playerCount}
        onValueChange={(itemValue) => setPlayerCount(itemValue)}
        style={styles.pickerStyles}
      >
        {playerCounts.map((players) => (
          <Picker.Item key={players} label={players} value={players} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 20,
  },
  selectedNumber: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  pickerStyles:{
    width:'70%',
    backgroundColor:'gray',
    color:'white',
    marginTop: 200,
  }
});
