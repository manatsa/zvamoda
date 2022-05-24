import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "../../config/Colors";

function AppButtonSmall({ title, onPress, color = "secondary" }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: Colors[color] }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    height: 45,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    minWidth: "20%",
    maxWidth: "35%",
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default AppButtonSmall;
