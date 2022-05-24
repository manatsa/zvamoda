import { StyleSheet, View } from "react-native";
import React from "react";
import { AppForm } from "../../components/form";
import AppFormDatePicker from "../../components/form/AppFormDatePicker";
import Cd4CountResultSource from "../../models/Cd4CountResultSource";
import TestType from "../../models/TestType";
import AppFormRadio from "../../components/form/AppFormRadio";
import AppFormPicker from "../../components/form/AppFormPicker";
import AppSubmitButtonSmall from "../../components/form/AppSubmitButtonSmall";
import cd4VLValidationSchema from "../../models/formVars/cd4VLValidationSchema";

export default function VLCD4GeneralDetailsStep({
  initValues,
  validationSchema,
  onNextStep,
  onBack,
}) {
  const firstStepValidation = cd4VLValidationSchema[0];

  return (
    <AppForm
      initialValues={initValues}
      validationSchema={firstStepValidation}
      onSubmit={onNextStep}
    >
      <AppFormDatePicker name={"dateTaken"} placeholder="Date  Taken" />

      <AppFormPicker
        name={"testType"}
        items={TestType}
        label={"Test Type "}
        icon={"none"}
      />
      <AppFormRadio
        items={Cd4CountResultSource}
        label={"Source "}
        name={"source"}
        row={"column"}
      />

      <AppFormDatePicker name={"nextTestDate"} placeholder="Next Test Date" />

      <View style={styles.buttonContainer}>
        <AppSubmitButtonSmall title={"Next"} />
      </View>
    </AppForm>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
    paddingVertical: 40,
  },
});
