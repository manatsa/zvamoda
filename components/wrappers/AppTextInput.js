import React from "react";
import { View, TextInput, StyleSheet, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../config/Colors";

function AppTextInput({ icon, ...otherProps }) {
  return (
    <View style={styles.container}>
      {icon && icon !== "none" && icon !== "" && (
        <MaterialIcons name={icon} style={styles.icon} size={35} />
      )}
      <TextInput style={styles.textInput} {...otherProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 15,
    marginTop: 20,
    flexDirection: "row",
    minHeight: 50,
    backgroundColor: Colors.light,
  },
  textInput: {
    width: "100%",
    color: Colors.secondary,
    fontFamily: Platform.OS == "android" ? "Roboto" : "Avenir",
    fontSize: 20,
    borderBottomColor: Colors.medium,
    borderBottomWidth: 0.5,
  },
  icon: {
    color: Colors.secondary,
    paddingRight: 10,
  },
});

export default AppTextInput;
