import React from "react";
import { SafeAreaView, StyleSheet, ScrollView, View } from "react-native";
import constants from "expo-constants";
import Colors from "../config/Colors";

function AppScreen({ children }) {
  //console.log(constants)
  return (
    <SafeAreaView style={styles.screen}>
      <View style={[styles.container]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    marginTop: constants.statusBarHeight,
  },
  container: {
    backgroundColor: Colors.lavendar,
    width: "100%",
    height: "100%",
    overflow: "scroll",
    //borderColor: Colors.secondary,
    //borderWidth: 0.2
  },
});
export default AppScreen;
