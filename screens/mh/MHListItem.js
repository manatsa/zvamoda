import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

export default function MHListItem({ index, mhScreening }) {
  const screening_date = mhScreening?.dateScreened
    ? "Screening Date: " +
      new Date(mhScreening.dateScreened)?.toISOString()?.slice(0, 10)
    : "Entry Date : " + new Date()?.toISOString().slice(0, 10);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text>{index + 1 + ". "}</Text>
        </View>

        <View>
          <Text style={styles.innerContainer}>{screening_date}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  innerContainer: {
    paddingHorizontal: 10,
  },
});
