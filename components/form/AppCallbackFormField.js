import React from "react";
import AppTextInput from "../wrappers/AppTextInput";
import AppErrorMessage from "./AppErrorMessage";
import { useFormikContext } from "formik";
import { StyleSheet, View } from "react-native";
import AppText from "../wrappers/AppText";

function AppCallbackFormField({ name, label, callback, ...otherProps }) {
  const {
    handleChange,
    setFieldValue,
    setFieldTouched,
    touched,
    errors,
    values,
  } = useFormikContext();

  const handleTextChange = (value) => {
    handleChange(name);
    callback ? callback(value, setFieldValue) : null;
  };
  return (
    <>
      <View style={styles.container}>
        {label && <AppText>{label}</AppText>}
        <AppTextInput
          onChangeText={() => handleChange(name)}
          onBlur={() => setFieldTouched(name)}
          value={values[name] + ""}
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
export default AppCallbackFormField;
