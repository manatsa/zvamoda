import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

export default function ContactListItem({ index, contact, patient }) {
  const [show, setShow] = useState(false);
  const contact_date = new Date(contact.contactDate)
    ?.toISOString()
    ?.slice(0, 10);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text>{index + 1 + ". "}</Text>
        </View>
        <View>
          <Text style={styles.innerContainer}>Contact Date</Text>
        </View>
        <View>
          <Text style={styles.innerContainer}>{contact_date}</Text>
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
