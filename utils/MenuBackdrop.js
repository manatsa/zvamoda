import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../config/Colors";
import EIcon from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/Ionicons";
import FIcon from "react-native-vector-icons/FontAwesome5";

export default function MenuBackdrop() {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>VL/CD4 Admin</Text>
        <FIcon
          name="virus"
          style={[styles.actionButtonIcon, { color: Colors.secondary }]}
        />
      </View>

      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>Referral Admin</Text>
        <Icon
          name="md-arrow-redo-sharp"
          style={[styles.actionButtonIcon, { color: Colors.dodger }]}
        />
      </View>

      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>Contact Admin</Text>
        <FIcon
          name="handshake"
          style={[styles.actionButtonIcon, { color: Colors.primary }]}
        />
      </View>

      <View style={styles.labelContainer}>
        <Text style={styles.labelText}> Mental Health </Text>
        <FIcon
          name="head-side-virus"
          style={[styles.actionButtonIcon, { color: Colors.danger }]}
        />
      </View>

      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>TB/TPT Screening</Text>
        <FIcon
          name="head-side-cough"
          style={[styles.actionButtonIcon, { color: Colors.bluish }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light,
    width: "100%",
    height: "100%",
    opacity: 0.9,
    padding: 40,
  },
  actionButtonIcon: {
    fontSize: 40,
    color: "white",
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 10,
  },
  labelText: {
    color: Colors.dodger,
    fontWeight: "bold",
  },
});
