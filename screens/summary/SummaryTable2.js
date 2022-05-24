import { LogBox, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Table, Row, Rows } from "react-native-table-component";
import Colors from "../../config/Colors";
import AppText from "../../components/wrappers/AppText";

export default function SummaryTable2({ data, headers, tableHeader }) {
  useEffect(() => {
    LogBox.ignoreLogs([
      "Invalid prop `textStyle` of type `array` supplied to `Cell`, expected `object`",
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.tableHeaderContainer}>
        <AppText style={styles.tableHeader}>{tableHeader}</AppText>
      </View>
      <Table borderStyle={{ borderWidth: 0.2, borderColor: Colors.primary }}>
        <Row
          data={headers}
          style={styles.head}
          textStyle={{ margin: 6, color: "#fff", fontWeight: "bold" }}
        />
        <Rows data={data} textStyle={{ margin: 6, color: Colors.secondary }} />
      </Table>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
    width: "100%",
  },
  head: { height: 40, backgroundColor: Colors.purple, fontWeight: "bold" },
  tableHeaderContainer: {
    width: "100%",
    color: Colors.primary,
    alignItems: "center",
    textDecorationLine: "underline",
    marginVertical: 10,
    // textTransform: ''
  },
  tableHeader: {
    color: Colors.primary,
    textDecorationLine: "underline",
  },
});
