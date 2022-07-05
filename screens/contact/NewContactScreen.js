import { Easing, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import AppScreen from "../../components/AppScreen";
import FormikStepper from "../../components/FormikStepper";
import StorageKeys from "../../utils/StorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, HelperText } from "react-native-paper";
import Colors from "../../config/Colors";
import contactInitValues from "../../models/formVars/contactInitValues";
import contactValidationSchema from "../../models/formVars/contactValidationSchema";
import SavePatientContact from "../patient/SavePatientContact";
import NewContactStepGeneralInfo from "./NewContactStepGeneralInfo";
import NewContactStepClinicalAssessments from "./NewContactStepClinicalAssessments";
import NewContactStepNonClinicalAssessments from "./NewContactStepNonClinicalAssessments";
import NewContactStepServicesOfferred from "./NewContactStepServicesOfferred";
import AppFlipXScreenCenter from "../../components/animatedContainers/AppFlipXScreenCenter";

export default function NewContactScreen({ navigation }) {
  const [mergedValues, setMergedValues] = useState({});
  const [working, setWorking] = useState(false);
  const [patient, setPatient] = useState(null);
  const [initState, setInitState] = useState({});
  const [locations, setLocations] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const patientString = await AsyncStorage.getItem(StorageKeys.patient);
        let p = JSON.parse(patientString);
        setPatient(p);
        setInitState(contactInitValues);
        const l = await AsyncStorage.getItem(StorageKeys.locationsKey);
        const loc = JSON.parse(l);
        setLocations(loc);
        const po = await AsyncStorage.getItem(StorageKeys.positionsKey);
        const pos = JSON.parse(po);
        setPositions(pos);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const steps = {
    0: NewContactStepGeneralInfo,
    1: NewContactStepNonClinicalAssessments,
    2: NewContactStepClinicalAssessments,
    3: NewContactStepServicesOfferred,
  };

  const stepLabels = [
    "Contact General Details",
    "Non Clinical Observations",
    "Clinical Observations",
    "Services Offered & CADRE",
  ];

  const submitHandler = async (values) => {
    setWorking(true);
    try {
      await SavePatientContact(values, patient, navigation);
    } finally {
      setWorking(false);
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
        initialValues={contactInitValues}
        validationSchema={contactValidationSchema}
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
