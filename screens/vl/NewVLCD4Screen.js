import { Easing, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import FormikStepper from "../../components/FormikStepper";
import StorageKeys from "../../utils/StorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, HelperText } from "react-native-paper";
import Colors from "../../config/Colors";
import VLCD4TestResultsStep from "./VLCD4TestResultsStep";
import SavePatientVLCD4 from "../patient/SavePatientVLCD4";
import VLInitValues from "../../models/formVars/VLInitValues";
import VLGeneralDetailsStep from "./VLGeneralDetailsStep";
import AppFlipXScreenCenter from "../../components/animatedContainers/AppFlipXScreenCenter";
import vlValidationSchema from "../../models/formVars/vlValidationSchema";

export default function NewVLCD4Screen({ navigation }) {
  const [mergedValues, setMergedValues] = useState({});
  const [working, setWorking] = useState(false);
  const [patient, setPatient] = useState(null);
  const [initState, setInitState] = useState(VLInitValues);

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
    0: VLGeneralDetailsStep,
    1: VLCD4TestResultsStep,
  };

  const stepLabels = ["VL/CD4 General Details", "VL/CD4 Results Details"];

  const submitHandler = async (values, setCurrentStep) => {
    try {
      await SavePatientVLCD4(values, patient, navigation);
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
        initialValues={VLInitValues}
        validationSchema={vlValidationSchema}
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
