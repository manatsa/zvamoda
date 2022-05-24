import React from "react";
import AppErrorMessage from "./AppErrorMessage";
import { useFormikContext } from "formik";
import { StyleSheet, View } from "react-native";
import AppText from "../wrappers/AppText";
import AppNumberInput from "../wrappers/AppNumberInput";
import { Text } from "react-native-paper";

function AppFormNumberInput({ name, label, callback, ...otherProps }) {
  const {
    handleChange,
    setFieldValue,
    setFieldTouched,
    touched,
    errors,
    values,
  } = useFormikContext();
  return (
    <>
      <View style={styles.container}>
        {label && <AppText>{label}</AppText>}
        <AppNumberInput
          onValueChange={(value) => {
            setFieldValue(name, value);
            callback ? callback(value) : null;
          }}
          value={String(values[name]) || ""}
          {...otherProps}
        />
        <AppErrorMessage message={errors[name]} visible={touched[name]} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    width: "100%",
  },
});
export default AppFormNumberInput;
