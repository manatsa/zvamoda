import { Easing, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import AppScreen from "../../components/AppScreen";
import FormikStepper from "../../components/FormikStepper";
import StorageKeys from "../../utils/StorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, HelperText } from "react-native-paper";
import contactInitValues from "../../models/formVars/contactInitValues";
import NewReferralGeneralInfoStep from "./NewReferralGeneralInfoStep";
import NewReferralServicesAvailedStep2 from "./NewReferralServicesAvailedStep2";
import NewReferralServicesAvailedStep1 from "./NewReferralServicesAvailedStep1";
import NewReferralServicesRequestedStep2 from "./NewReferralServicesRequestedStep2";
import NewReferralServicesRequestedStep1 from "./NewReferralServicesRequestedStep1";
import referralInitValues from "../../models/formVars/referralInitValues";
import referralValidationSchema from "../../models/formVars/referralValidationSchema";
import Colors from "../../config/Colors";
import SavePatientReferral from "../patient/SavePatientReferral";
import AppFlipXScreenCenter from "../../components/animatedContainers/AppFlipXScreenCenter";
// import Toast from "../../utils/Toast";

export default function NewReferralScreen({ navigation }) {
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
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const steps = {
    0: NewReferralGeneralInfoStep,
    1: NewReferralServicesAvailedStep1,
    2: NewReferralServicesAvailedStep2,
    3: NewReferralServicesRequestedStep1,
    4: NewReferralServicesRequestedStep2,
  };

  const stepLabels = [
    "General Details",
    "Services Availed 1",
    "Services Availed 2",
    "Services Requested 1",
    "Services Requested 2",
  ];

  const submitHandler = async (values) => {
    setWorking(true);
    try {
      await SavePatientReferral(values, patient, navigation);
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
        initialValues={referralInitValues}
        validationSchema={referralValidationSchema}
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
