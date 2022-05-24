import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../config/Colors";
import Slider from "@react-native-community/slider";

export default function AppSlider({ min, max, step, onValueChange }) {
  return (
    <View>
      <Slider
        style={styles.slider}
        minimumValue={min}
        maximumValue={max}
        step={step}
        onValueChange={onValueChange}
        maxmumTrackTintColor="#FFFFFF"
        minimumTrackTintColor={Colors.secondary}
        tapToSeek={true}
        thumbTintColor={Colors.primary}
        vertical={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: "100%",
    backgroundColor: Colors.light,
  },
  slider: {
    width: "100%",
    height: 40,
    borderColor: Colors.bluish,
    borderBottomWidth: 1,
  },
});
