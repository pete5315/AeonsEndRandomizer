import * as React from "react";
import { View, Text, Animated } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

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
        <Text>Cards! </Text>
      </View>
    </FadeInView>
  );
}
