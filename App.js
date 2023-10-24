import * as React from "react";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, Animated } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { store } from "./src/redux/store";
import { Provider, useDispatch, useSelector } from "react-redux";

import Market from "./src/components/2-Market/Market";
import Campaign from "./src/components/3-Campaign/Campaign";
import Cards from "./src/components/4-Cards/Cards";
import Animation from "./src/components/ReusableComponents/Animation/Animation";

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

  const market = useSelector((store) => store.market);
  const dispatch = useDispatch();
  const initialDraw = async () => {
    try {
      dispatch({
        type: "DRAW_MARKET",
        payload: {
          market,
          selectedSets,
        },
      });
    } catch (err) {
      console.log("error in initial draw", err);
    } finally {
      dispatch({ type: "RESET_MARKET_IS_LOADING" });
    }
  };
  const selectedSets = useSelector((store) => store.sets);


  return (
    <Tab.Navigator {...{ screenOptions, sceneContainerStyle }}>
      <Tab.Screen
        name="Settings"
        component={Animation}
        listeners={({ navigation, route }) => ({
          focus: (e) => {
            // Trigger your saga or action when Tab1 is focused
            // You can dispatch actions, initiate sagas, or perform any specific logic here.
            console.log("Settings is focused");
          },
        })}
      />
      <Tab.Screen
        name="Market"
        component={Animation}
        listeners={({ navigation, route }) => ({
          focus: (e) => {
            // Trigger your saga or action when Tab1 is focused
            // You can dispatch actions, initiate sagas, or perform any specific logic here.
            console.log("Market is focused");
            if (market.length < 9) {
              dispatch({ type: "SET_MARKET_IS_LOADING" });
              initialDraw();
            } else {
              dispatch({ type: "RESET_MARKET_IS_LOADING" });
              console.log("Market is already loaded");
            }
          },
        })}
      />
      <Tab.Screen
        name="Campaign"
        component={Animation}
        listeners={({ navigation, route }) => ({
          focus: (e) => {
            // Trigger your saga or action when Tab1 is focused
            // You can dispatch actions, initiate sagas, or perform any specific logic here.
            console.log("Campaign is focused");
          },
        })}
      />
      <Tab.Screen
        name="Cards"
        component={Animation}
        listeners={({ navigation, route }) => ({
          focus: (e) => {
            // Trigger your saga or action when Tab1 is focused
            // You can dispatch actions, initiate sagas, or perform any specific logic here.
            console.log("Cards is focused");
          },
        })}
      />
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
