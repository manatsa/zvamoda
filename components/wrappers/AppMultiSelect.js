import { LogBox, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import RNMultiSelect from "@freakycoder/react-native-multiple-select";
import Colors from "../../config/Colors";

export default function AppMultiSelect({ items, onChange }) {
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);
  return (
    <View>
      <RNMultiSelect
        disableAbsolute={false}
        data={items}
        menuBarContainerStyle={{ flex: 1 }}
        width={"100%"}
        menuItemTextStyle={{
          paddingVertical: 5,
          marginVertical: 5,
        }}
        // arrowImageStyle={{ color: Colors.primary }}
        onDoneButtonPress={(selectedItems) => onChange(selectedItems)}
        onSelect={(selectedItems) => setSelectedItems(selectedItems)}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
