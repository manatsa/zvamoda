import React, { useState } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import constants from "expo-constants";

function AppZoomOutViewScreen({
  children,
  easing = Easing.bounce,
  duration = 1000,
}) {
  let scale = useState(new Animated.Value(0.1))[0];

  const startAnimation = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: duration,
      easing: easing,
      useNativeDriver: true,
    }).start();
  };
  const animatedStyles = {
    transform: [{ scale: scale }],
  };

  startAnimation();
  return (
    <Animated.View style={[styles.container, animatedStyles]}>
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
export default AppZoomOutViewScreen;
