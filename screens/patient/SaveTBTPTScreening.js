import { Alert, StyleSheet } from "react-native";
import StorageKeys from "../../utils/StorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function SavePatientTBScreening(
  values,
  patient,
  navigation
) {
  //console.log("\n\nVALUES::", values, "\n");

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
  if (values["onTBTreatment"] === "0") {
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
    const tbz = JSON.parse(current);
    tbz.forEach((t) => {
      tbs.push(t);
    });
  }

  let newValues = {
    ...values,
    ...{ patient: patient.id },
  };

  if (newValues.patient && newValues.patient.length > 0) {
    tbs.push(newValues);
    //console.log("\n\n >>> TBS >>>> \n", newValues, "\n\n");
    const mergedTBString = JSON.stringify(tbs);
    if (mergedTBString) {
      await AsyncStorage.setItem(StorageKeys.tbScreeningKey, mergedTBString);
      Alert.alert("TB screening item saved successfully");
    } else {
      console.log("Nothing to save");
    }
  } else {
    Alert.alert(
      "ERROR SAVING ITEM",
      "TB/TPT item could not be saved.\n Please enter the item again."
    );
  }

  navigation.navigate("TBList");
}

const styles = StyleSheet.create({});
