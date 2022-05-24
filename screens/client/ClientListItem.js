import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

export default function ClientListItem({ index, client }) {
  const [show, setShow] = useState(false);
  const clientName = client?.lastName + " " + client?.firstName;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text>{index + 1 + ". "}</Text>
        </View>
        <View>
          <Text style={styles.innerContainer}>Name : </Text>
        </View>
        <View>
          <Text style={styles.innerContainer}>{clientName}</Text>
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
