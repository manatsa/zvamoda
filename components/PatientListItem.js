import React from "react";
import { View, StyleSheet, TouchableHighlight, Text } from "react-native";
import Colors from "../config/Colors";
import colors from "../config/Colors";
import AppText from "./wrappers/AppText";

function PatientListItem({ item, index, onPress }) {
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={"lightgrey"}
      style={styles.touchable}
    >
      <View style={styles.detailsContainer}>
        <View style={styles.details}>
          <View style={styles.name}>
            <AppText style={styles.title}>{index + 1}</AppText>
            <AppText style={styles.title}>
              {item.lastName + " " + item.firstName}
            </AppText>
          </View>
          <AppText style={styles.subTitle}>
            {"Gender: " + item.gender + " / D.O.B: " + item.dateOfBirth}
          </AppText>
          <AppText style={styles.subTitle}>
            {"Age : " +
              item.age +
              "yrs" +
              " / STATUS:" +
              (item.enhancedStatus === 0 ? "Standard" : "Enhanced")}
          </AppText>
          <AppText style={styles.subTitle}>
            {"Facility: " + item.facility + " / District: " + item.district}
          </AppText>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  touchable: {
    paddingVertical: 10,
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 3,
  },
  detailsContainer: {
    flexDirection: "row",
    width: "100%",
  },
  name: {
    flex: 1,
    flexDirection: "row",
  },
  details: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 25,
    color: colors.secondary,
  },
  subTitle: {
    fontSize: 13,
    color: "grey",
  },
});

export default PatientListItem;
