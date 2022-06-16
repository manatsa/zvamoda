import { Easing, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import AppScreen from "../../components/AppScreen";
import FormikStepper from "../../components/FormikStepper";
import StorageKeys from "../../utils/StorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, HelperText } from "react-native-paper";
import Colors from "../../config/Colors";
import contactInitValues from "../../models/formVars/contactInitValues";
import NewClientPersonalDetailsStep from "./NewClientPersonalDetailsStep";
import NewClientGeneralDetailsStep from "./NewClientGeneralDetailsStep";
import clientInitValues from "../../models/formVars/clientInitValues";
import clientValidationSchema from "../../models/formVars/clientValidationSchema";
import NewClientContactDetailsStep from "./NewClientContactDetailsStep";
import NewClientDisclosureDetailsStep from "./NewClientDisclosureDetailsStep";
import NewClientFinalDetailsStep from "./NewClientFinalDetailsStep";
import SaveNewClient from "../patient/SaveNewClient";
import AppFlipXScreenCenter from "../../components/animatedContainers/AppFlipXScreenCenter";
// import Toast from "../../utils/Toast";

export default function NewClientScreen({ navigation }) {
  const [mergedValues, setMergedValues] = useState({});
  const [working, setWorking] = useState(false);
  const [initState, setInitState] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        setInitState(contactInitValues);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const steps = {
    0: NewClientPersonalDetailsStep,
    1: NewClientGeneralDetailsStep,
    2: NewClientContactDetailsStep,
    3: NewClientDisclosureDetailsStep,
    4: NewClientFinalDetailsStep,
  };

  const stepLabels = [
    "Personal Details",
    "General Details",
    "Contact Details",
    "Disclosure  Details",
    "Other Details",
  ];

  const submitHandler = async (values) => {
    setWorking(true);
    setMergedValues({});
    try {
      await SaveNewClient(values, navigation);
      new Promise((resolve) => setTimeout(() => {}, 3000));
      //console.log(mergedValues);
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
        initialValues={clientInitValues}
        validationSchema={clientValidationSchema}
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
