import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import AppText from "./AppText";
import Colors from "../../config/Colors";

function AppRadio({ items, value, onValueChange, row }) {
  return (
    <View style={[styles.container, { flexDirection: row }]}>
      {items.map((res) => {
        return (
          <View
            key={res.value}
            style={[styles.container, { flexDirection: "row" }]}
          >
            <TouchableOpacity
              style={styles.radioCircle}
              onPress={() => onValueChange(res.value)}
            >
              {value === res.value && <View style={styles.selectedRb} />}
            </TouchableOpacity>
            <AppText style={styles.radioText}>{res.label}</AppText>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  radioText: {
    marginRight: 15,
    fontSize: 20,
    color: Colors.secondary,
    fontWeight: "500",
  },
  radioCircle: {
    height: 25,
    width: 25,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRb: {
    width: 12,
    height: 12,
    borderRadius: 50,
    backgroundColor: Colors.primary,
  },
});
export default AppRadio;
