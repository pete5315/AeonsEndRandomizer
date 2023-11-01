import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch, useSelector } from "react-redux";

import Animation from "../ReusableComponents/Animation/Animation";

import FAIcon from "react-native-vector-icons/FontAwesome"; // Replace with the desired icon library (e.g., MaterialIcons, Ionicons, etc.)
import ENIcon from "react-native-vector-icons/Entypo"; // Replace with the desired icon library (e.g., MaterialIcons, Ionicons, etc.)

const Tab = createBottomTabNavigator();


export default function MyTabs() {
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
        options={{
          tabBarIcon: ({ color, size }) => (
            <FAIcon name="cog" size={size} color={color} />
          ),
        }}
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
        options={{
          tabBarIcon: ({ color, size }) => (
            <ENIcon name="shop" size={size} color={color} />
          ),
        }}
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
        options={{
          tabBarIcon: ({ color, size }) => (
            <ENIcon name="trophy" size={size} color={color} />
          ),
        }}
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
        options={{
          tabBarIcon: ({ color, size }) => (
            <ENIcon name="drive" size={size} color={color} />
          ),
        }}
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
