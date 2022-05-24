import { Alert, StyleSheet } from "react-native";
import StorageKeys from "../../utils/StorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function SavePatientMHScreening(
  values,
  patient,
  navigation
) {
  let { dateScreened } = values;
  Alert.alert("Date Screened", dateScreened);
  let current = await AsyncStorage.getItem(StorageKeys.mhScreeningKey);
  let mhs = [];
  if (current) {
    mhs = JSON.parse(current);
  }

  let newValues = {
    ...values,
    ...{ patient: patient.id },
  };

  mhs.push(newValues);
  const mergedMHString = JSON.stringify(mhs);
  if (mergedMHString) {
    await AsyncStorage.setItem(StorageKeys.mhScreeningKey, mergedMHString);
    Alert.alert("Mental health screening item saved successfully");
  } else {
    console.log("Nothing to save");
  }
  navigation.navigate("MHList");
}

const styles = StyleSheet.create({});
