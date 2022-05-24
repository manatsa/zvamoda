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
import { useNavigation } from "@react-navigation/native";
import SavePatientTBScreening from "../patient/SaveTBTPTScreening";
import { Text } from "react-native-paper";

export default function TBScreeningGeneralInfoStep({
  initValues,
  validationSchema,
  onNextStep,
  onBack,
}) {
  const [screened, setScreened] = useState("0");
  const [identified, setIdentified] = useState("");
  const [onTreat, setOnTreat] = useState("");
  const [screenedByHcw, setScreenedByHCW] = useState("");
  const [patient, setPatient] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getData = async () => {
      try {
        const pString = await AsyncStorage.getItem(StorageKeys.patient);
        const p = JSON.parse(pString);
        setPatient(p);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const submitEarly = async (values, form) => {
    form.resetForm();
    try {
      await SavePatientTBScreening(values, patient, navigation);
    } finally {
    }
  };

  const decideNextStep = async (values, form) => {
    if (screened === "1" || onTreat === "0") {
      submitEarly(values, form);
    } else {
      onNextStep(values);
    }
  };
  return (
    <AppForm
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={decideNextStep}
    >
      <AppFormPicker
        icon={"none"}
        items={YesNo}
        label={"Screened For TB"}
        name="screenedForTb"
        callback={setScreened}
      />

      {screened === "0" && (
        <>
          <AppDateComponent
            label={"Date Screened"}
            name={"dateScreened"}
            color={Colors.primary}
          />

          <AppFormPicker
            icon={"none"}
            items={YesNo}
            label={"Found With TB Symptoms"}
            name="identifiedWithTb"
            callback={setIdentified}
          />
          {screened === "0" && identified === "0" && (
            <>
              <AppFormCheckBox
                items={TbSymptoms}
                label="Identified Symptoms"
                name={"tbSymptoms"}
              />
              <AppFormPicker
                icon={"none"}
                items={YesNo}
                label={"Screened By HCW"}
                name="screenedByHcw"
                callback={setScreenedByHCW}
              />

              {screened === "0" && identified === "0" && screenedByHcw === "0" && (
                <>
                  <AppFormPicker
                    icon={"none"}
                    items={YesNo}
                    label={"Found Symptoms By HCW"}
                    name="identifiedWithTbByHcw"
                  />
                </>
              )}

              <AppFormPicker
                icon={"none"}
                items={YesNo}
                label={"On TB Treatment"}
                name="onTBTreatment"
                callback={setOnTreat}
              />
              {screened === "0" && identified === "0" && onTreat === "0" && (
                <>
                  <AppDateComponent
                    name={"dateStartedTreatment"}
                    label={"Date Started Treatment"}
                  />

                  <AppDateComponent
                    name={"dateCompletedTreatment"}
                    label={"Date Completed Treatment"}
                  />
                </>
              )}
            </>
          )}
        </>
      )}

      <View style={styles.buttonContainer}>
        {(screened === "1" || onTreat === "0") && (
          <AppSubmitButtonSmall title={"Save"} />
        )}
        {screened === "0" && onTreat !== "0" && (
          <AppSubmitButtonSmall title={"Next"} />
        )}
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
    alignItems: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 40,
  },
});
