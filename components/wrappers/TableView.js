import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Share,
  Linking,
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import React, { useState } from "react";
import { Divider, Title } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AppPicker from "./AppPicker";
import Colors from "../../config/Colors";
import AppText from "./AppText";
import { jsonToCSV } from "react-native-csv";
import Communications from "react-native-communications";

export default function TableView({
  title = "Data Table",
  titleColor = Colors.secondary,
  data,
  headers,
  paginate,
  setItemsPerPage,
  setPage,
  page,
  itemsPerPage,
  pageOptions,
  headerColor,
  firstColumnColor,
  highlightRows,
  highlightColumns,
  padding,
  alignColumns = "center",
  alignFirstColumn = "flex-start",
  setFetching,
  setProgress,
  exportable,
}) {
  const jsonData = `[
    {
        "Column 1": "1-1",
        "Column 2": "1-2",
        "Column 3": "1-3",
        "Column 4": "1-4"
    },
    {
        "Column 1": "2-1",
        "Column 2": "2-2",
        "Column 3": "2-3",
        "Column 4": "2-4"
    },
    {
        "Column 1": "3-1",
        "Column 2": "3-2",
        "Column 3": "3-3",
        "Column 4": "3-4"
    },
    {
        "Column 1": 4,
        "Column 2": 5,
        "Column 3": 6,
        "Column 4": 7
    }
  ]`;

  const createAndSaveCSV = async () => {
    // const results = jsonToCSV(data);
    // const response = await SendEmail(
    //   "manatsa@zvandiri.org",
    //   "Test Email",
    //   results,
    //   {}
    // );

    // console.log(response);
    Communications.email(
      ["manatsa@zvandiri.org", "manatsachinyeruse@gmail.com"], // destination emails
      null, //  CC email
      null, //  bcc
      "Enter Subject", //<--- Subject
      "Enter body for the mail" //<--- Body Text
    );

    Alert.alert("Your message was successfully sent!");
    // SendEmail(
    //   "manatsa@zvandiri.org",
    //   "We need your feedback",
    //   "UserName, we need 2 minutes of your time to fill this quick survey [link]",
    //   {}
    //   //{ cc: "user@domain.com; user2@domain.com; userx@domain1.com" }
    // ).then(() => {
    //   Alert.alert("Your message was successfully sent!");
    //   console.log("Your message was successfully sent!");
    // });
  };

  const formattedData = itemsPerPage
    ? data?.slice(itemsPerPage * page, itemsPerPage * (page + 1))
    : data;

  return (
    <View>
      <View style={{ alignItems: "center", paddingBottom: 10 }}>
        <AppText style={{ color: titleColor }}>{title}</AppText>
      </View>
      <Grid>
        <Row>
          {headers.map((h, index) => {
            return (
              <Col
                key={index}
                style={{
                  width: h.size,
                  alignItems: alignColumns,
                  paddingHorizontal: padding ? "0.5%" : 0,
                }}
              >
                <Title
                  style={{
                    backgroundColor: highlightColumns
                      ? index % 2 === 1
                        ? "#efefef"
                        : "#fff"
                      : "#ddd",
                    color: headerColor,
                    alignItems: alignColumns,
                  }}
                  textBreakStrategy={"balanced"}
                >
                  {h.title}
                </Title>
              </Col>
            );
          })}
        </Row>

        <Divider
          style={{
            marginTop: 1,
            borderColor: Colors.primary,
            borderWidth: 0.3,
          }}
        />

        {formattedData?.map((item, i) => {
          return (
            <View key={i}>
              <Row
                style={{
                  backgroundColor: highlightRows
                    ? i % 2 === 1
                      ? "#eee"
                      : "#fff"
                    : "white",
                  color: headerColor,
                }}
                key={i}
              >
                {Object.keys(item)?.map((k, index) => {
                  return (
                    <Col
                      key={index}
                      style={{
                        width: headers[index].size,
                        color: headerColor,
                        alignItems:
                          index == 0 ? alignFirstColumn : alignColumns,
                        paddingHorizontal: padding ? "0.5%" : 0,
                      }}
                    >
                      <Text
                        style={{
                          paddingHorizontal: 2,
                          color: firstColumnColor
                            ? index === 0
                              ? firstColumnColor
                              : "black"
                            : "black",
                        }}
                      >
                        {item[headers[index].field]}
                      </Text>
                    </Col>
                  );
                })}
              </Row>
              <Divider />
            </View>
          );
        })}
      </Grid>
      <Divider
        style={{ marginTop: 1, borderColor: Colors.primary, borderWidth: 0.3 }}
      />

      {paginate && (
        <View style={styles.bottomControls}>
          <Text>Rows: </Text>
          <AppPicker
            items={pageOptions?.map((p) => {
              return { label: String(p), value: p };
            })}
            onValueChange={(pageSize) => {
              setPage(0);
              setItemsPerPage(pageSize);
            }}
            value={itemsPerPage}
            style={{
              width: 120,
              height: 80,
              backgroundColor: "transparent",
              borderBottomWidth: 0,
            }}
          />
          <Text style={{ paddingHorizontal: 5 }}>{`${
            data.length < 1 ? 0 : page * itemsPerPage + 1
          } to ${
            (page + 1) * itemsPerPage === 0
              ? data.length
              : data.length > (page + 1) * itemsPerPage
              ? (page + 1) * itemsPerPage
              : data.length
          } of ${data?.length}`}</Text>

          <TouchableOpacity
            onPress={() => {
              page >= 1 ? setPage(--page) : null;
            }}
            style={{ backgroundColor: "#eee" }}
          >
            <FontAwesome
              name="chevron-left"
              size={20}
              color={titleColor}
              style={{ paddingHorizontal: 16 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Math.floor(data.length / itemsPerPage) > page
                ? setPage(++page)
                : null;
            }}
            style={{ backgroundColor: "#eee" }}
          >
            <FontAwesome
              name="chevron-right"
              size={20}
              color={titleColor}
              style={{ paddingHorizontal: 16 }}
            />
          </TouchableOpacity>
          {exportable && (
            <FontAwesome5
              name={"download"}
              size={25}
              color={Colors.greenish}
              onPress={async () => {
                setFetching(true);
                createAndSaveCSV();
                setFetching(false);
                // onShare();
              }}
            />
          )}
        </View>
      )}
      <Divider
        style={{ marginTop: 0, borderColor: Colors.primary, borderWidth: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomControls: {
    paddingTop: 2,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
