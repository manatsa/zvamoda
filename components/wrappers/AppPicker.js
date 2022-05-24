import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../config/Colors";

function AppPicker({ icon, value, onValueChange, items, prompt, style }) {
  return (
    <View style={[styles.container, style]}>
      {(icon || icon !== "none") && (
        <MaterialIcons name={icon} style={styles.icon} size={20} />
      )}
      <Picker
        style={styles.picker}
        selectedValue={String(value)}
        onValueChange={(value) => {
          //Alert.alert(value);
          onValueChange(value);
        }}
      >
        <Picker.Item
          label={prompt}
          key={"none"}
          value={""}
          style={{ fontWeight: "300", textTransform: "uppercase" }}
          color={Colors.secondary}
        />
        {items?.map((item) => {
          return (
            <Picker.Item
              label={item.label}
              key={item.value}
              value={String(item.value)}
            />
          );
        })}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 0,
    marginTop: 0,
    flexDirection: "row",
    borderBottomWidth: 1,
    backgroundColor: Colors.light,
  },
  picker: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    flex: 1,
  },
  icon: {
    color: Colors.primary,
    paddingRight: 10,
  },
});
export default AppPicker;
