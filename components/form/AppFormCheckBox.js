import { useFormikContext } from "formik";
import React from "react";
import { AppErrorMessage } from ".";
import AppPicker from "../wrappers/AppPicker";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../config/Colors";
import AppText from "../wrappers/AppText";
import AppExpoCheckbox from "../wrappers/AppExpoCheckbox";

function AppFormCheckBox({ name, label, items, callback }) {
  const { values, setFieldValue, errors, touched } = useFormikContext();

  const onValueChange = (value, item) => {
    let newValue = [...values[name]];
    if (value === true) {
      !checkIfItemInArray(newValue, item) ? newValue.push(item.value) : null;
    } else {
      newValue = newValue.filter((t) => t !== item.value);
    }
    setFieldValue(name, newValue);
    callback ? callback(items) : null;
  };

  const checkIfItemInArray = (arrayValue, item) => {
    let itemInArray = false;
    if (arrayValue?.filter((e) => e === item.value).length > 0) {
      itemInArray = true;
    }
    return itemInArray;
  };

  return (
    <View style={styles.boxContainer}>
      <AppText style={styles.checkCategoryText}>{label}</AppText>
      <View style={styles.checkDetailsHolder}>
        {items &&
          items.map((item, index) => {
            //console.log("VALUES:", values);
            return (
              <View style={styles.detailsContainer} key={"c-" + index}>
                <AppExpoCheckbox
                  value={checkIfItemInArray(values[name], item) ? true : false}
                  key={"box-" + index}
                  onValueChange={(value) => onValueChange(value, item)}
                />
                <Text style={styles.checkText}>{item.label}</Text>
              </View>
            );
          })}
      </View>

      {errors[name] && (
        <AppErrorMessage message={errors[name]} visible={touched[name]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    //backgroundColor: Colors.light,
    width: "95%",
    marginVertical: 5,
    alignItems: "center",
    marginHorizontal: 10,
  },
  checkDetailsHolder: {
    width: "100%",
  },
  detailsContainer: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 10,
    marginVertical: 5,
    backgroundColor: Colors.light,
  },
  checkbox: {
    color: Colors.secondary,
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 1.5,
  },
  checkCategoryText: {
    width: "100%",
    overflow: "visible",
    flexWrap: "wrap",
    fontWeight: "bold",
  },
  checkText: {
    width: "80%",
    overflow: "visible",
    flexWrap: "wrap",
  },
});
export default AppFormCheckBox;
