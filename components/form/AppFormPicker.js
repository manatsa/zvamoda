import { useFormikContext } from "formik";
import React from "react";
import { AppErrorMessage } from ".";
import AppPicker from "../wrappers/AppPicker";
import { StyleSheet, View } from "react-native";
import Colors from "../../config/Colors";
import AppText from "../wrappers/AppText";

function AppFormPicker({ icon, name, label, items, callback }) {
  const { values, setFieldValue, errors, touched } = useFormikContext();
  return (
    <View style={styles.pickerContainer}>
      <AppText
        style={{
          // textDecorationLine: "underline",
          width: "100%",
        }}
      >
        {label}
      </AppText>
      <AppPicker
        style={styles.picker}
        icon={icon | "none"}
        items={items}
        onValueChange={(item) => {
          setFieldValue(name, String(item));
          callback ? callback(item) : null;

          //console.log("value::", values[name]);
        }}
        prompt={label}
        value={values[name]}
      />
      {errors[name] && (
        <AppErrorMessage message={errors[name]} visible={touched[name]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    //backgroundColor: Colors.light,
    width: "95%",
    marginVertical: 5,
    alignItems: "center",
    marginHorizontal: 10,
  },
  picker: {
    color: Colors.secondary,
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 1.5,
  },
});
export default AppFormPicker;
