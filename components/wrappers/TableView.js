import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  ScrollView,
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import React, { useEffect, useState } from "react";
import { Divider } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AppPicker from "./AppPicker";
import Colors from "../../config/Colors";
import AppText from "./AppText";
import XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import AppTextInput from "./AppTextInput";
// import RNFS from "react-native-fs";
// import RNFetchBlob from "react-native-fetch-blob";
// var RNFetchBlob = require("react-native-fetch-blob").default;

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
  fontSize = 12,
  property = "indicator",
}) {
  const [formattedData, setFormattedData] = useState(data);
  // const filename = `/ExportedStats-${new Date().toISOString().slice(0, 10)}-${
  //   new Date().getHours
  // }-${new Date().getMinutes()}-${new Date().getSeconds()}-.xlsx`;

  useEffect(() => {
    setFormattedData(data);
  }, [data]);

  const createAndSaveCSV = async () => {
    try {
      let isPermitedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      var ws = XLSX.utils.json_to_sheet(data);
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Cities");
      const wbout = XLSX.write(wb, {
        type: "base64",
        bookType: "xlsx",
      });

      const uri = FileSystem.cacheDirectory + ".xlsx";
      console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);
      await FileSystem.writeAsStringAsync(uri, wbout, {
        encoding: FileSystem.EncodingType.Base64,
      });

      if (!Sharing.isAvailableAsync) {
        Alert.alert(
          "Feature Not Found",
          "Expo Sharing not available in this app!"
        );
      } else {
        Alert.alert("Feature  Found", "Expo Sharing  available in this app!");
      }
      await Sharing.shareAsync(`file`, {
        mimeType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        dialogTitle: "MyWater data",
        UTI: "com.microsoft.excel.xlsx",
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Download Error", String(error));
    }
  };

  useEffect(() => {
    setFormattedData(
      itemsPerPage
        ? data
          ? data?.slice(itemsPerPage * page, itemsPerPage * (page + 1))
          : []
        : data
        ? data
        : []
    );
  }, [page, itemsPerPage]);

  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          paddingBottom: 10,
          alignItems: "center",
          width: "100%",
          backgroundColor: Colors.medium,
        }}
      >
        <AppText
          style={{
            color: titleColor,
            paddingHorizontal: 10,
            paddingVertical: 0,
            fontSize: 14,
          }}
        >
          {title}
        </AppText>
        <View>
          <AppTextInput
            stylez={{
              width: 200,
              backgroundColor: "transparent",
              borderBottomWidth: 1,
              borderColor: Colors.secondary,
              fontSize: 10,
            }}
            placeholder="search name"
            onChangeText={(value) =>
              setFormattedData(
                data?.filter((p) =>
                  property === "indicator"
                    ? p?.pname?.toLowerCase()?.includes(value.toLowerCase())
                    : p?.firstName
                        ?.toLowerCase()
                        ?.includes(value.toLowerCase()) ||
                      p?.lastName?.toLowerCase()?.includes(value.toLowerCase())
                )
              )
            }
            icon={"search"}
          />
        </View>
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
                <Text
                  style={{
                    backgroundColor: highlightColumns
                      ? index % 2 === 1
                        ? "#efefef"
                        : "#fff"
                      : "#ddd",
                    color: headerColor,
                    alignItems: alignColumns,
                    flexWrap: "wrap",
                  }}
                  textBreakStrategy={"balanced"}
                >
                  {h.title}
                </Text>
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
                  height: 28,
                }}
                key={i}
              >
                {Object.keys(item)?.map((k, index) => {
                  return (
                    <Col
                      key={index}
                      style={{
                        width: headers[index]?.size,
                        color: headerColor,
                        alignItems:
                          index == 0 ? alignFirstColumn : alignColumns,
                        paddingHorizontal: padding ? "0.5%" : 0,
                      }}
                    >
                      <Text
                        style={{
                          paddingHorizontal:
                            item[headers[index]?.field]?.padding,
                          color: firstColumnColor
                            ? index === 0
                              ? firstColumnColor
                              : "black"
                            : "black",
                          flexWrap: "wrap",
                          flexShrink: 1,
                          fontSize: fontSize,
                          paddingVertical: 5,
                          textTransform: "lowercase",
                        }}
                        textBreakStrategy="balanced"
                      >
                        {/* {console.log(item[headers[index]?.field])} */}
                        {item[headers[index]?.field]}
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
            data?.length < 1 ? 0 : page * itemsPerPage + 1
          } to ${
            (page + 1) * itemsPerPage === 0
              ? data?.length
              : data?.length > (page + 1) * itemsPerPage
              ? (page + 1) * itemsPerPage
              : data?.length
          } of ${data?.length}`}</Text>

          <TouchableOpacity
            onPress={() => {
              if (page >= 1) {
                setPage(--page);
              }
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
              if (Math.floor(data?.length / itemsPerPage) > page) {
                setPage(++page);
              }
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
                await createAndSaveCSV();
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bottomControls: {
    paddingTop: 2,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
