import React, { useState } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import constants from "expo-constants";

function AppFlipYScreenCenter({
  children,
  easing = Easing.bounce,
  duration = 1000,
  style,
}) {
  let scale = useState(new Animated.Value(-2))[0];

  const startAnimation = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: duration,
      easing: easing,
      useNativeDriver: true,
    }).start();
  };
  const animatedStyles = {
    transform: [{ scaleX: scale }],
  };

  startAnimation();
  return (
    <Animated.View
      style={[styles.container, animatedStyles]}
      // contentContainerStyle={[style]}
      // horizontal={true}
      v
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: constants.statusBarHeight,
    width: "100%",
    flex: 1,
    paddingHorizontal: 10,
  },
});
export default AppFlipYScreenCenter;
