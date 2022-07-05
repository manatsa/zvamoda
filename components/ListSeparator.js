import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/Colors";

function ListSeparator({ color, size = 1 }) {
  return (
    <View
      style={[
        styles.separator,
        { borderColor: color ? color : colors.primary, borderWidth: size },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    borderStyle: "solid",
  },
});
export default ListSeparator;
