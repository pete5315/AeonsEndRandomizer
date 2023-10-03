import * as React from "react";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, Animated } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";

import Market from "./src/components/Market/Market";
import Campaign from "./src/components/Campaign/Campaign";
import Cards from "./src/components/Cards/Cards";
import Animation from "./src/components/Animation/Animation";

const Stack = createNativeStackNavigator();

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

function SettingsScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        backgroundColor: "#95a5a6",
      }}
    >
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const FadeCampaign = (props, { navigation }) => (
  <FadeInView>
    <Campaign {...props} />
  </FadeInView>
);
const FadeMarket = (props, { navigation }) => (
  <FadeInView>
    <Market {...props} />
  </FadeInView>
);
const FadeCards = (props, { navigation }) => (
  <FadeInView>
    <Cards {...props} />
  </FadeInView>
);
const FadeSettings = (props, { navigation }) => (
  <FadeInView>
    <SettingsScreen {...props} />
  </FadeInView>
);

function MyTabs() {
  const screenOptions = {
    unmountOnBlur: false,
    headerShown: false,
    tabBarStyle: {
      backgroundColor: "#95a5a6",
      height: 100,
    },
    tabBarItemStyle: {
      backgroundColor: "#ffffff",
      margin: 5,
      borderRadius: 10,
    },
  };
  const sceneContainerStyle = {
    backgroundColor: "#95a5a6",
  };
  return (
    <Tab.Navigator {...{ screenOptions, sceneContainerStyle }}>
      <Tab.Screen name="Settings" component={Animation} />
      <Tab.Screen name="Market" component={Animation} />
      <Tab.Screen name="Campaign" component={Animation} />
      <Tab.Screen name="Cards" component={Animation} />
    </Tab.Navigator>
  );
}

const screenOptions = {
  tabBarStyle: {
    backgroundColor: "#0000ff",
    height: 100,
  },
  tabBarItemStyle: {
    backgroundColor: "#00ff00",
    margin: 5,
    borderRadius: 10,
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </Provider>
  );
}
