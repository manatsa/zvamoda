import React, { useState } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import constants from "expo-constants";

function AppRotateScreenCenter({
  children,
  easing = Easing.bounce,
  duration = 1000,
}) {
  let rotate = useState(new Animated.Value(0))[0];

  const rotateAnimation = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const startAnimation = () => {
    Animated.timing(rotate, {
      toValue: 1,
      duration: duration,
      easing: easing,
      useNativeDriver: true,
    }).start();
  };
  const animatedStyles = {
    transform: [{ rotate: rotateAnimation }],
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
    height: "100%",
    flex: 1,
    //marginHorizontal: 10,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
export default AppRotateScreenCenter;
