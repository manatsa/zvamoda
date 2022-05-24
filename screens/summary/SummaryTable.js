import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { DataTable } from "react-native-paper";
import Colors from "../../config/Colors";

export default function SummaryTable({ headers, data }) {
  const optionsPerPage = [3, 5, 10, 20, 50];
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  //headers={label, type, field}
  return (
    <View style={styles.mainContainer}>
      <DataTable>
        <DataTable.Header style={styles.header}>
          <DataTable.Title numeric style={styles.title}>
            <Text style={styles.title}>{"No. "}</Text>
          </DataTable.Title>
          {headers.map((h, i) => {
            return (
              <DataTable.Title {...h.type} style={styles.title}>
                <Text style={styles.title}>{h.label}</Text>
              </DataTable.Title>
            );
          })}
        </DataTable.Header>

        {data.map((row, index) => {
          let keys = Object.keys(row);

          return (
            <DataTable.Row key={"row" + index}>
              <DataTable.Cell>{index + 1}</DataTable.Cell>
              {keys.map((key, ind) => {
                return <DataTable.Cell key={ind}>{row[key]}</DataTable.Cell>;
              })}
            </DataTable.Row>
          );
        })}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(data.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={itemsPerPage + " of " + data.length}
          optionsPerPage={optionsPerPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          optionsLabel={"Rows per page"}
        />
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontWeight: "500",
    color: Colors.primary,
  },
  title: {
    fontWeight: "bold",
    color: Colors.primary,
    justifyContent: "flex-start",
    width: "100%",
  },
});
