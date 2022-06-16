import React from "react";
import { StyleSheet } from "react-native";
import StorageKeys from "../../utils/StorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function SavePatientContact(values, patient, navigation) {
  let ea1 = null;
  let ea2 = null;
  let ea3 = null;
  const whichEac = values?.whichEac;
  const contactPhone = values?.contactPhoneOption;
  const Smses = values?.numberOfSms;
  const patientObj = { patient: patient.id };
  const contactPhoneObj = {
    contactPhoneOption:
      contactPhone !== "" && contactPhone >= 0 ? contactPhone : null,
  };
  const SmsesObj = {
    numberOfSms: Smses !== "" && Smses >= 0 ? Smses : null,
  };
  if (whichEac) {
    switch (whichEac) {
      case "eac1":
        ea1 = 1;
        break;
      case "eac2":
        ea2 = 1;
        break;
      case "eac3":
        ea3 = 1;
        break;
    }
  }
  delete values["whichEac"];

  const eac1Obj = { eac1: ea1 };
  const eac2Obj = { eac2: ea2 };
  const eac3Obj = { eac3: ea3 };

  const newValues = {
    ...values,
    ...patientObj,
    ...eac1Obj,
    ...eac2Obj,
    ...eac3Obj,
    ...contactPhoneObj,
    ...SmsesObj,
  };
  let current = await AsyncStorage.getItem(StorageKeys.contacts);
  let contacts = [];
  if (current) {
    contacts = JSON.parse(current);
  }
  if (newValues.patient && newValues.patient.length > 0) {
    contacts.push(newValues);
    const mergedContactString = JSON.stringify(contacts);
    if (mergedContactString) {
      await AsyncStorage.setItem(StorageKeys.contacts, mergedContactString);
    } else {
      console.log("Nothing to save");
    }
  } else {
    Alert.alert(
      "ERROR SAVING ITEM",
      "Contact item could not be saved.\n Please enter the item again."
    );
  }

  navigation.navigate("ContactList");
}

const styles = StyleSheet.create({});
