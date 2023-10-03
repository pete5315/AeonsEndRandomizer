import * as React from "react";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Animated,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";

import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import Market from "./src/components/Market/Market";
import Campaign from "./src/components/Campaign/Campaign";
import Cards from "./src/components/Cards/Cards";
import Settings from "./src/components/Settings/Settings";
import Animation from "./src/components/Animation/Animation";

const Stack = createNativeStackNavigator();

// export default function App() {
//   return (

//     <NavigationContainer>
//       {/* Similar to a Router */}
//       <Stack.Navigator initialRouteName="App">
//         {/* Similar to a Route */}
//         <Stack.Screen name="Market" component={Market} />
//         <Stack.Screen name="Campaign" component={Campaign} />
//         <Stack.Screen name="Cards" component={Cards} />
//         <Stack.Screen name="Options" component={Options} />
//       </Stack.Navigator>
//     </NavigationContainer>
//             <StatusBar
//             backgroundColor="teal"
//             animated
//             barStyle={"default"}
//             hidden={false}
//           />
//   );
// }

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Home"
//         screenOptions={{ headerShown: false }}
//       >
//         <Stack.Screen name="Home">
//           {() => (
//             <Tab.Navigator
//               initialRouteName="App"
//               tabBar={() => null}
//               screenOptions={{ headerShown: false }}
//             >
//               <Tab.Screen name="Campaign" component={Campaign} />
//               <Tab.Screen name="Market" component={Market} />
//               <Tab.Screen name="Cards" component={Cards} />
//               <Tab.Screen name="Settings" component={Settings} />
//             </Tab.Navigator>
//           )}
//         </Stack.Screen>

//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// function MyTabBar({ state, descriptors, navigation }) {
//   return (
//     <View style={{ flexDirection: 'row' }}>
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name);
//           }
//         };

//         const onLongPress = () => {
//           navigation.emit({
//             type: 'tabLongPress',
//             target: route.key,
//           });
//         };

//         return (
//           <TouchableOpacity
//             accessibilityRole="button"
//             accessibilityState={isFocused ? { selected: true } : {}}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarTestID}
//             onPress={onPress}
//             onLongPress={onLongPress}
//             style={{ flex: 1 }}
//           >
//             <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
//               {label}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator {...{ screenOptions }} tabBar={(props) => <MyTabBar {...props} />}>
//         <Tab.Screen name="Campaign" component={Campaign} />
//         <Tab.Screen name="Market" component={Market} />
//         <Tab.Screen name="Cards" component={Cards} />
//         <Tab.Screen name="Settings" component={Settings} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// const screenOptions = {
//   tabBarStyle:{
//     backgroundColor:'#0000ff',
//     height:100,
//   },
//   tabBarItemStyle:{
//     backgroundColor:'#00ff00',
//     margin:5,
//     borderRadius:10,
//   }
// };

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

// function HomeScreen({ navigation }) {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         // alignItems: "center",
//         backgroundColor: "#95a5a6",
//       }}
//     >
//       <Text>Home!</Text>
//     </View>
//   );
// }
// //logic
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
      backgroundColor: "#0000ff",
      height: 100,
    },
    tabBarItemStyle: {
      backgroundColor: "#00ff00",
      margin: 5,
      borderRadius: 10,
    },
  };
  const sceneContainerStyle = {
    backgroundColor: "#95a5a6",
  };
  return (
    <Tab.Navigator {...{ screenOptions, sceneContainerStyle }}>
      <Tab.Screen name="Campaign" component={Animation} />
      <Tab.Screen name="Market" component={Animation} />
      <Tab.Screen name="Cards" component={Animation} />
      <Tab.Screen name="Settings" component={Animation} />
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
