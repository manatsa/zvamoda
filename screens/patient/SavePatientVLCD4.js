import { Alert, StyleSheet } from "react-native";
import StorageKeys from "../../utils/StorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function SavePatientVLCD4(values, patient, navigation) {
  let current = await AsyncStorage.getItem(StorageKeys.vls);

  let vls = [];
  if (current) {
    vls = JSON.parse(current);
  }
  if (String(values["haveResult"]) === "1") {
    values["result"] = null;
    values["tnd"] = null;
  }
  const res = values["result"];
  const tnds = res && res?.toLowerCase() === "tnd" ? "tnd" : "";
  const results = isNaN(res) ? "" : res;
  let newValues = {
    ...values,
    ...{ result: results },
    ...{ tnd: tnds },
    ...{ patient: patient.id },
  };
  delete newValues["0"];
  delete newValues["0"];

  if (newValues.patient && newValues.patient.length > 0) {
    vls.push(newValues);
    const mergedVLString = JSON.stringify(vls);
    if (mergedVLString) {
      await AsyncStorage.setItem(StorageKeys.vls, mergedVLString);
      Alert.alert("VL/CD4 items saved successfully");
    } else {
      console.log("Nothing to save");
    }
  } else {
    Alert.alert(
      "ERROR SAVING ITEM",
      "VL/CD4 item could not be saved.\n Please enter the item again."
    );
  }

  navigation.navigate("VLCD4List");
}

const styles = StyleSheet.create({});
