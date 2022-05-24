import { useFormikContext } from "formik";
import React from "react";
import { AppErrorMessage } from ".";
import AppPicker from "../wrappers/AppPicker";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../config/Colors";
import AppText from "../wrappers/AppText";
import AppExpoCheckbox from "../wrappers/AppExpoCheckbox";

function AppFormSingleCheckBox({ name, label, callback }) {
  const { setFieldValue, errors, touched, values } = useFormikContext();

  const onValueChange = (item) => {
    setFieldValue(name, item);
    callback ? callback(item, setFieldValue) : null;
  };

  return (
    <View style={styles.boxContainer}>
      <AppText style={styles.checkCategoryText}>{label}</AppText>
      <View style={styles.checkDetailsHolder}>
        <View style={styles.detailsContainer}>
          <AppExpoCheckbox
            value={values[name]}
            onValueChange={(value) => onValueChange(value)}
          />
        </View>
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
export default AppFormSingleCheckBox;
