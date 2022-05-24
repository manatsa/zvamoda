import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import constants from "expo-constants";
import Colors from "../config/Colors";

function AppScrollScreen({ children }) {
  //console.log(constants)
  return (
    <View style={styles.screen}>
      <ScrollView>{children}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    marginTop: constants.statusBarHeight,
    flex: 1,
  },
  container: {
    backgroundColor: Colors.lavendar,
    width: "100%",
    height: "100%",
    overflow: "scroll",
  },
});
export default AppScrollScreen;
