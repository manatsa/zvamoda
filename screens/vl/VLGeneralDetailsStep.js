import { StyleSheet, View } from "react-native";
import React from "react";
import { AppForm } from "../../components/form";
import Cd4CountResultSource from "../../models/Cd4CountResultSource";
import TestType from "../../models/TestType";
import AppFormRadio from "../../components/form/AppFormRadio";
import AppFormPicker from "../../components/form/AppFormPicker";
import AppSubmitButtonSmall from "../../components/form/AppSubmitButtonSmall";
import AppDatePicker from "../../components/wrappers/AppDatePicker";

export default function VLGeneralDetailsStep({
  initValues,
  validationSchema,
  onNextStep,
  onBack,
}) {
  return (
    <AppForm
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={onNextStep}
    >
      {/* <AppDateComponent name={"dateTaken"} label={"Date  Taken"} /> */}
      <AppDatePicker name={"dateTaken"} label={"Date Taken"} />

      <AppFormPicker
        name={"testType"}
        items={TestType}
        label={"Test Type"}
        icon={"none"}
      />
      <AppFormRadio
        items={Cd4CountResultSource}
        label={"Source "}
        name={"source"}
        row={"column"}
      />

      {/* <AppDateComponent name={"nextTestDate"} label={"Next Test Date"} />
      <AppDatePicker name={"nextTestDate"} label={"Next Test Date"} /> */}

      <View style={styles.buttonContainer}>
        <AppSubmitButtonSmall title={"Next"} />
      </View>
    </AppForm>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    justifyContent: "flex-end",
    flexDirection: "row",
    padding: 30,
  },
});
