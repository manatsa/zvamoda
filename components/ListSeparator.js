import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/Colors";

function ListSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: "solid",
  },
});
export default ListSeparator;
