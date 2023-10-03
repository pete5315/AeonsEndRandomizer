import { View, Text } from "react-native";

export default function Settings() {
  return (
    <View>
      <FlatList
      data={sets}
      />
      <Text>Options! </Text>
    </View>
  );
}
