import { Alert, StyleSheet } from "react-native";
import StorageKeys from "../../utils/StorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function SavePatientMHScreening(
  values,
  patient,
  navigation
) {
  let { dateScreened } = values;
  let current = await AsyncStorage.getItem(StorageKeys.mhScreeningKey);
  let mhs = [];
  if (current) {
    mhs = JSON.parse(current);
  }

  let newValues = {
    ...values,
    ...{ patient: patient.id },
  };

  if (newValues.patient && newValues.patient.length > 0) {
    mhs.push(newValues);
    const mergedMHString = JSON.stringify(mhs);
    if (mergedMHString) {
      await AsyncStorage.setItem(StorageKeys.mhScreeningKey, mergedMHString);
      Alert.alert("Mental health screening item saved successfully");
    } else {
      console.log("Nothing to save");
    }
  } else {
    Alert.alert(
      "ERROR SAVING ITEM",
      "MH Screening item could not be saved.\n Please enter the item again."
    );
  }

  navigation.navigate("MHList");
}

const styles = StyleSheet.create({});
