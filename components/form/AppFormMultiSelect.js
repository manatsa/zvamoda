import { useFormikContext } from "formik";
import React from "react";
import { AppErrorMessage } from ".";
import { StyleSheet, View } from "react-native";
import AppText from "../wrappers/AppText";
import AppMultiSelect from "../wrappers/AppMultiSelect";

function AppFormMultiSelect({ name, label, items }) {
  const { values, setFieldValue, errors, touched } = useFormikContext();
  const data = items.map((item, index) => {
    return { id: index, value: item.label, isChecked: false };
  });
  return (
    <View>
      <View style={styles.container}>
        <AppText style={{ paddingRight: 10 }}>{label}</AppText>
        <AppMultiSelect
          items={data}
          onChange={(item) => {
            setFieldValue(name, item);
          }}
        />
      </View>

      <AppErrorMessage message={errors[name]} visible={touched[name]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%" },
});
export default AppFormMultiSelect;
