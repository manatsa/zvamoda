import { useFormikContext } from "formik";
import React from "react";
import { LogBox, StyleSheet, View } from "react-native";
import { DatePickerInput } from "react-native-paper-dates";
import Colors from "../../config/Colors";
import { AppErrorMessage } from "../form";
import AppDateComponent from "./AppDateComponent";

export default function AppDatePickerInput({
  name,
  label,
  placeholder,
  callback,
}) {
  React.useEffect(() => {
    LogBox.ignoreLogs(["is not registered, key"]);
  }, []);
  const { errors, values, setFieldValue, touched } = useFormikContext();

  return (
    <>
      <AppDateComponent
        style={styles.datePicker}
        locale="en"
        label={label}
        mode={"flat"}
        editable={true}
        value={values[name]}
        onChange={(d) => {
          setFieldValue(name, d);
          callback ? callback(d) : null;
        }}
        inputMode={"start"}
        theme={Colors.bluish}
        placeholder={placeholder}
      />
      <AppErrorMessage message={errors[name]} visible={touched[name]} />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  datePicker: {
    width: "100%",
    color: Colors.primary,
    paddingHorizontal: 10,
    backgroundColor: Colors.light,
  },
});
