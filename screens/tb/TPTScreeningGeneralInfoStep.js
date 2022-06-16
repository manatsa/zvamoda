import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../config/Colors";
import { AppForm } from "../../components/form";
import AppFormPicker from "../../components/form/AppFormPicker";
import AppSubmitButtonSmall from "../../components/form/AppSubmitButtonSmall";
import YesNo from "../../models/YesNo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKeys from "../../utils/StorageKeys";
import AppDateComponent from "../../components/wrappers/AppDateComponent";
import AppFormCheckBox from "../../components/form/AppFormCheckBox";
import TbSymptoms from "../../models/TbSymptoms";
import AppButtonSmall from "../../components/wrappers/AppButtonSmall";
import AppDatePicker from "../../components/wrappers/AppDatePicker";
import { useFormikContext } from "formik";

export default function TPTScreeningGeneralInfoStep({
  initValues,
  validationSchema,
  onNextStep,
  onBack,
}) {
  const [eligible, setEligible] = useState("");
  const [onTPT, setOnTPT] = useState("");
  const [startedTPT, setStartedTPT] = useState("");
  const [patient, setPatient] = useState([]);
  const [value, setValue] = useState(null);

  //console.log(value);
  return (
    <AppForm
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={onNextStep}
    >
      <AppFormPicker
        icon={"none"}
        items={YesNo}
        label={"Referred For Investigation"}
        name="referredForInvestigation"
        callback={setValue}
      />

      <AppFormPicker
        icon={"none"}
        items={YesNo}
        label={"Eligible For TPT"}
        name="eligibleForIpt"
        callback={setEligible}
      />

      {eligible === "0" && (
        <>
          <AppFormPicker
            icon={"none"}
            items={YesNo}
            label={"Referred For TPT"}
            name="referredForIpt"
          />

          <AppFormPicker
            icon={"none"}
            items={YesNo}
            label={"Currently On TPT"}
            name="onIpt"
            callback={setOnTPT}
          />

          {eligible === "0" && onTPT === "0" && (
            <>
              {/* <AppDateComponent
                name={"dateStartedIpt"}
                label={"Date Started TPT"}
              /> */}
              <AppDatePicker
                name={"dateStartedIpt"}
                label={"Date Started TPT"}
              />
              {/* <AppDateComponent
                name={"dateCompletedIpt"}
                label={"Date Completed TPT"}
              /> */}
              <AppDatePicker
                name={"dateCompletedIpt"}
                label={"Date Completed TPT"}
              />
            </>
          )}

          <AppFormPicker
            icon={"none"}
            items={YesNo}
            label={"Started On TPT"}
            name="startedOnIpt"
            callback={setStartedTPT}
          />

          {eligible === "0" && startedTPT === "0" && (
            <>
              {/* <AppDateComponent
                name={"dateStartedOnIpt"}
                label={"Date Started TPT"}
              /> */}
              <AppDatePicker
                name={"dateStartedOnIpt"}
                label={"Date Started TPT"}
              />
              {/* <AppDateComponent
                name={"dateCompletedOnIpt"}
                label={"Date Completed TPT"}
              /> */}
              <AppDatePicker
                name={"dateCompletedOnIpt"}
                label={"Date Completed TPT"}
              />
            </>
          )}
        </>
      )}

      <View style={styles.buttonContainer}>
        <AppButtonSmall title={"Back"} onPress={onBack} />
        <AppSubmitButtonSmall title={"Save"} />
      </View>
    </AppForm>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.light,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
    paddingVertical: 40,
  },
});
