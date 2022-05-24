import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { decode, encode } from "base-64";
import MainStackNavigation from "./navigation/MainStackNavigation";
import { StyleSheet } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import { Provider } from "react-native-paper";
import { navigationRef } from "./navigation/RootNavigation";

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

export default function App() {
  return (
    <Provider>
      <ToastProvider>
        <NavigationContainer ref={navigationRef}>
          <MainStackNavigation />
        </NavigationContainer>
      </ToastProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  floatContainer: {
    width: "100%",
    height: "100%",
  },
  actions: { fontSize: 16, fontWeight: "bold" },
});
