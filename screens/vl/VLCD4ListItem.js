import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

export default function VLCD4ListItem({ index, vl, patient }) {
  const [show, setShow] = useState(false);
  const date_taken = new Date(vl.dateTaken)?.toISOString()?.slice(0, 10);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text>{index + 1 + ". "}</Text>
        </View>
        <View>
          <Text style={styles.innerContainer}>Date Taken</Text>
        </View>
        <View>
          <Text style={styles.innerContainer}>{date_taken}</Text>
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
