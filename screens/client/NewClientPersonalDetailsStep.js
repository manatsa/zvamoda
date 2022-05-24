import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../config/Colors";
import { AppForm, AppFormField } from "../../components/form";
import AppFormPicker from "../../components/form/AppFormPicker";
import AppSubmitButtonSmall from "../../components/form/AppSubmitButtonSmall";
import YesNo from "../../models/YesNo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKeys from "../../utils/StorageKeys";
import PatientStatus from "../../models/PatientStatus";
import Gender from "../../models/Gender";
import ClientType from "../../models/ClientType";
import AppDateComponent from "../../components/wrappers/AppDateComponent";

export default function NewClientPersonalDetailsStep({
  initValues,
  validationSchema,
  onNextStep,
  onBack,
}) {
  const [showCaptureForm, setShowCaptureForm] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const uString = await AsyncStorage.getItem(StorageKeys.currentUserKey);
        const u = JSON.parse(uString);
        setUser(u);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  initValues["status"] = "5";

  const decideOnStatus = (status) => {
    //decide what to do based on current status
    setShowCaptureForm(false);
    switch (status) {
      case "0":
        //client is deceased

        break;
      case "1":
      case "2":
      case "4":
      case "6":
      case "7":
      case "8":
        //don't do anything on these statuses
        break;
      case "3":
        //client has changed location
        break;
      case "5":
        //client is active, needs to be captured.
        setShowCaptureForm(true);
        break;
    }
  };

  return (
    <AppForm
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={onNextStep}
    >
      <AppFormPicker
        icon={"none"}
        items={PatientStatus}
        label={"Client Status"}
        name="status"
        callback={decideOnStatus}
      />
      {showCaptureForm && (
        <>
          <AppFormField
            name="firstName"
            label={"Client First Name"}
            placeholder={"first name"}
          />

          <AppFormField
            name="middleName"
            label={"Client Middle Name"}
            placeholder={"middle name"}
          />
          <AppFormField
            name="lastName"
            label={"Client Last Name"}
            placeholder={"last name"}
          />

          <AppFormField
            name="IDNumber"
            label={"Client ID Number"}
            placeholder={"ID number"}
          />

          <AppFormPicker
            icon={"none"}
            items={Gender}
            label={"Gender"}
            name="gender"
          />

          <AppDateComponent name={"dateOfBirth"} label={"Date of Birth"} />

          <AppFormField
            name="oINumber"
            label={"OI/ART Number"}
            placeholder={"oi/art number"}
          />

          <AppFormPicker
            icon={"none"}
            items={YesNo}
            label={"Has Birth Certificate"}
            name="haveBirthCertificate"
          />

          {user?.userLevel === "DISTRICT" && (
            <AppFormPicker
              icon={"none"}
              items={ClientType}
              label={"Client Type"}
              name="clientType"
            />
          )}

          <View style={styles.buttonContainer}>
            <AppSubmitButtonSmall title={"Next"} />
          </View>
        </>
      )}
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
