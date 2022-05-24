import React, { useState } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import constants from "expo-constants";

function AppCombinedRotateScreenCenter({
  children,
  easing = Easing.bounce,
  duration = 1000,
}) {
  const rotate = useState(new Animated.Value(0))[0];

  const startAnimation = () => {
    Animated.timing(rotate, {
      toValue: 1,
      duration: duration,
      easing: easing,
      useNativeDriver: true,
    }).start(() => {
      rotate.setValue(0);
    });
  };

  const xInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const yInterpolate = rotate.interpolate({
    inputRange: [0, 0.9, 1],
    outputRange: ["0deg", "0deg", "180deg"],
  });

  const animatedStyles = {
    transform: [{ rotateX: xInterpolate }, { rotateY: yInterpolate }],
  };

  startAnimation();
  return (
    <Animated.ScrollView
      style={[animatedStyles]}
      //contentContainerStyle={styles.container}
    >
      {children}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: constants.statusBarHeight,
    width: "100%",
    flex: 1,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default AppCombinedRotateScreenCenter;
