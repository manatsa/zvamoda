import { useFormikContext } from "formik";
import React from "react";
import { AppErrorMessage } from ".";
import AppRadio from "../wrappers/AppRadio";
import { StyleSheet, View } from "react-native";
import AppText from "../wrappers/AppText";

function AppFormRadio({ name, label, items, row }) {
  const { values, setFieldValue, errors, touched } = useFormikContext();
  return (
    <View>
      <View style={styles.container}>
        <AppText style={{ paddingRight: 10 }}>{label}</AppText>
        <AppRadio
          items={items}
          onValueChange={(item) => {
            //console.log(item);
            setFieldValue(name, item);
          }}
          label={label}
          value={values[name]}
          row={row}
        />
      </View>

      <AppErrorMessage message={errors[name]} visible={touched[name]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", flexDirection: "row" },
});
export default AppFormRadio;
