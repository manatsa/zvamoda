import React from "react";
import {
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Colors from "../../config/Colors";

export default function LoadingButton({
  isLoading,
  onPress,
  title,
  loadingLabel,
  color,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={isLoading ? null : onPress}>
        <View
          style={{
            ...styles.button,
            backgroundColor: isLoading ? "grey" : Colors[color],
          }}
        >
          {isLoading && (
            <ActivityIndicator size="large" color={Colors.greenish} />
          )}
          <Text style={styles.buttonText}>
            {isLoading ? loadingLabel : title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

// Kindacode.com
// Just some styles
const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: 70,
    borderWidth: 1,
    borderColor: "#666",
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
