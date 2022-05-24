import Checkbox from "expo-checkbox";
import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../../config/Colors";

export default function AppExpoCheckbox({ value, onValueChange }) {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Checkbox
          style={styles.checkbox}
          value={value}
          onValueChange={onValueChange}
          color={value ? Colors.secondary : undefined}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 5,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 5,
    padding: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "400",
  },
  detail: {
    backgroundColor: Colors.light,
  },
});
