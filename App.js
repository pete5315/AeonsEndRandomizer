import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import MyTabs from "./src/components/0-MyTabs/MyTabs";


export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
          <MyTabs />
      </NavigationContainer>
    </Provider>
  );
}
