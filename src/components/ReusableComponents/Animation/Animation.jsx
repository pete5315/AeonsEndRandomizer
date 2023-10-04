import * as React from "react";
import { View, Text, Animated } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import Market from "../../2-Market/Market";
import Campaign from "../../3-Campaign/Campaign";
import Cards from "../../4-Cards/Cards";
import Settings from "../../1-Settings/Settings";

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

export default function Animation(props) {
  console.log("animation props", props.route.name);
  return (
    <FadeInView>
      {props.route.name === "Campaign" && (
        <FadeInView>
          <Campaign />
        </FadeInView>
      )}
      {props.route.name === "Market" && (
        <FadeInView>
          <Market />
        </FadeInView>
      )}
      {props.route.name === "Cards" && (
        <FadeInView>
          <Cards />
        </FadeInView>
      )}
      {props.route.name === "Settings" && (
        <FadeInView>
          <Settings />
        </FadeInView>
      )}
    </FadeInView>
  );
}
