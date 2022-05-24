import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../config/Colors";
import AppText from "../../components/wrappers/AppText";

export default function ShowUserInfo({ user }) {
  return (
    <View style={styles.container}>
      <AppText style={styles.userHeader}>User Information</AppText>
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.text}>First Name</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.text}>{user?.firstName}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.text}>Last Name</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.text}>{user?.lastName}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.text}>Username</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.text}>{user?.userName}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.text}>User Level</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.text}>{user?.userLevel}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.text}>District</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.text}>{user?.district?.name}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.text}>User Province</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.text}>{user?.province?.name}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    paddingHorizontal: 20,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cell: {
    flex: 0.5,
    borderRightColor: Colors.medium,
    borderRightWidth: 0.5,
    padding: 10,
  },
  userHeader: {
    color: Colors.light,
    marginVertical: 5,
    backgroundColor: Colors.bluish,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors.bluish,
  },
});
