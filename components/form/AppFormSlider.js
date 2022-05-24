import { useFormikContext } from "formik";
import React from "react";
import { AppErrorMessage } from ".";
import AppPicker from "../wrappers/AppPicker";
import { StyleSheet, View } from "react-native";
import Colors from "../../config/Colors";
import AppText from "../wrappers/AppText";
import AppSlider from "../wrappers/AppSlider";

function AppFormSlider({ name, label, min, max, step, callback }) {
  const { values, setFieldValue, errors, touched } = useFormikContext();
  return (
    <View style={styles.sliderContainer}>
      <AppText
        style={{
          width: "100%",
        }}
      >
        {label}
      </AppText>
      <View style={styles.sliderDetails}>
        <AppText style={styles.sliderValue}>{values[name] + ""}</AppText>
        <AppSlider
          onValueChange={(item) => {
            callback ? callback(item) : null;
            setFieldValue(name, item);
          }}
          min={min}
          max={max}
          step={step}
        />
      </View>

      {errors[name] && (
        <AppErrorMessage message={errors[name]} visible={touched[name]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    //backgroundColor: Colors.light,
    width: "95%",
    marginVertical: 5,
    alignItems: "center",
    marginHorizontal: 10,
  },
  sliderValue: {
    color: Colors.secondary,
    alignItems: "center",
  },
  sliderDetails: {
    width: "100%",
  },
});
export default AppFormSlider;
