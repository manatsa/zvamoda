import React, { useState } from "react";
import { View, Switch, StyleSheet } from "react-native";
import Colors from "../../config/Colors";

const AppSwitch = ({value, onValueChange}) => {
  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: Colors.light, true: Colors.primary }}
        thumbColor={value ? Colors.secondary : Colors.medium}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default AppSwitch;