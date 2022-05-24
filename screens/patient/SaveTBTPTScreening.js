import { Alert, StyleSheet } from "react-native";
import StorageKeys from "../../utils/StorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function SavePatientTBScreening(
  values,
  patient,
  navigation
) {
  if (values["screenedForTb"] !== "0") {
    values["dateScreened"] = null;
    values["identifiedWithTb"] = "";
  }
  if (values["identifiedWithTb"] !== "0") {
    values["onTBTreatment"] = "";
    values["tbSymptoms"] = [];
  }
  if (values["onTBTreatment"] !== "0") {
    values["dateStartedTreatment"] = null;
    values["dateCompletedTreatment"] = null;
  }
  if (values["onTBTreatment"] !== "1") {
    values["referredForInvestigation"] = "";
    values["eligibleForIpt"] = "";
    values["onIpt"] = "";
    values["startedOnIpt"] = "";
  }
  if (values["onIpt"] !== "0") {
    values["dateStartedIpt"] = null;
    values["dateCompletedIpt"] = null;
  }
  if (values["startedOnIpt"] !== "0") {
    values["dateCompletedOnIpt"] = null;
    values["dateStartedOnIpt"] = null;
  }

  let current = await AsyncStorage.getItem(StorageKeys.tbScreeningKey);
  let tbs = [];
  if (current) {
    tbs = JSON.parse(current);
  }

  let newValues = {
    ...values,
    ...{ patient: patient.id },
  };

  tbs.push(newValues);
  console.log(tbs);

  const mergedTBString = JSON.stringify(tbs);
  if (mergedTBString) {
    await AsyncStorage.setItem(StorageKeys.tbScreeningKey, mergedTBString);
    Alert.alert("TB screening item saved successfully");
  } else {
    console.log("Nothing to save");
  }
  navigation.navigate("TBList");
}

const styles = StyleSheet.create({});
