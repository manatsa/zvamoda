import { Easing, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import AppScreen from "../../components/AppScreen";
import FormikStepper from "../../components/FormikStepper";
import StorageKeys from "../../utils/StorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, HelperText } from "react-native-paper";
import Colors from "../../config/Colors";
import VLInitValues from "../../models/formVars/VLInitValues";
import TBScreeningGeneralInfoStep from "./TBScreeningGeneralInfoStep";
import tbInitValues from "../../models/formVars/tbInitValues";
import tbValidationSchema from "../../models/formVars/tbValidationSchema";
import TPTScreeningGeneralInfoStep from "./TPTScreeningGeneralInfoStep";
import SavePatientTBScreening from "../patient/SaveTBTPTScreening";
import AppFlipXScreenCenter from "../../components/animatedContainers/AppFlipXScreenCenter";

export default function NewTBScreeningScreen({ navigation }) {
  const [mergedValues, setMergedValues] = useState({});
  const [working, setWorking] = useState(false);
  const [patient, setPatient] = useState(null);
  const [initState, setInitState] = useState(VLInitValues);
  const [goToNext, goToNextStep] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const patientString = await AsyncStorage.getItem(StorageKeys.patient);
        let p = JSON.parse(patientString);
        setPatient(p);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const steps = {
    0: TBScreeningGeneralInfoStep,
    1: TPTScreeningGeneralInfoStep,
  };

  const stepLabels = ["TB General Details", "TPT General Details"];

  const submitHandler = async (values, setCurrentStep) => {
    //rconsole.log(values);
    try {
      await SavePatientTBScreening(values, patient, navigation);
      setMergedValues(initState);
      setCurrentStep(0);
    } finally {
    }
  };

  return (
    <AppFlipXScreenCenter easing={Easing.in} duration={1000}>
      {working && (
        <View style={styles.activityIndicator}>
          <ActivityIndicator
            animating={true}
            color={Colors.danger}
            size={"large"}
          />
          <HelperText>{" Please wait..."}</HelperText>
        </View>
      )}

      <FormikStepper
        steps={steps}
        stepLabels={stepLabels}
        initialValues={tbInitValues}
        validationSchema={tbValidationSchema}
        mergedValues={mergedValues}
        setMergedValues={setMergedValues}
        onSubmit={submitHandler}
      />
    </AppFlipXScreenCenter>
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
