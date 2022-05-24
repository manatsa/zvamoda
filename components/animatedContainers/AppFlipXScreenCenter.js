import React, { useState } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import constants from "expo-constants";

function AppFlipXScreenCenter({
  children,
  easing = Easing.bounce,
  duration = 1000,
}) {
  let scale = useState(new Animated.Value(-1))[0];

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
    <Animated.ScrollView style={[styles.container, animatedStyles]}>
      {children}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: constants.statusBarHeight,
    width: "100%",
    paddingHorizontal: 20,
    //flex: 1,
    //marginHorizontal: 10,
    //justifyContent: "center",
    //alignItems: "center",
  },
});
export default AppFlipXScreenCenter;
