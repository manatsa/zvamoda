import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default function AppNumberInput({
  mainContainerStyle,
  leftButtonStyle,
  rightButtonStyle,
  leftButtonColor,
  rightButtonColor,
  iconSize,
  value,
  onValueChange,
  textSize,
  textColor,
}) {
  const [num, setNum] = useState(0);

  const decrease = () => {
    const newNum = num - 1;
    setNum(newNum);
    onValueChange !== null ? onValueChange(newNum) : null;
  };

  const increase = () => {
    const newNum = num + 1;
    setNum(newNum);
    onValueChange != null ? onValueChange(newNum) : null;
  };

  return (
    <View style={[styles.container, mainContainerStyle]}>
      <TouchableOpacity
        style={[styles.leftButtonContainer, leftButtonStyle]}
        onPress={() => decrease()}
      >
        <MIcon
          name="minus"
          size={iconSize || 30}
          color={leftButtonColor || "#E6E6FA"}
        />
      </TouchableOpacity>

      <Text
        style={{
          fontSize: textSize || 20,
          color: textColor || "#6960EC",
          textAlign: "center",
          alignSelf: "center",
          fontWeight: "700",
          zIndex: 20,
        }}
      >
        {String(value)}
      </Text>

      <TouchableOpacity
        style={[styles.rightButtonContainer, rightButtonStyle]}
        onPress={() => increase()}
      >
        <MIcon
          name="plus"
          size={iconSize || 30}
          color={rightButtonColor || "#E6E6FA"}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    backgroundColor: "#E6E6FA",
    borderRadius: 25,
    height: 60,
    marginHorizontal: 10,
    marginVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },
  leftButtonContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#D32A22",
    borderRadius: 25,
    alignSelf: "flex-start",
    zIndex: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  rightButtonContainer: {
    width: 40,
    height: 40,
    backgroundColor: "dodgerblue",
    borderRadius: 25,
    alignSelf: "flex-end",
    zIndex: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
