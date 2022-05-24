import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

export default function ReferralListItem({ index, referral }) {
  const referral_date = new Date(referral.referralDate)
    ?.toISOString()
    ?.slice(0, 10);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text>{index + 1 + ". "}</Text>
        </View>
        <View>
          <Text style={styles.innerContainer}>Referral Date</Text>
        </View>
        <View>
          <Text style={styles.innerContainer}>{referral_date}</Text>
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
