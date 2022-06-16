import { Alert, StyleSheet } from "react-native";
import StorageKeys from "../../utils/StorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function SavePatientReferral(values, patient, navigation) {
  let current = await AsyncStorage.getItem(StorageKeys.referrals);
  let refs = [];
  if (current) {
    refs = JSON.parse(current);
  }

  let newValues = {
    ...values,
    ...{ patient: patient.id },
  };

  if (newValues.patient && newValues.patient.length > 0) {
    refs.push(newValues);
    const mergedRefstring = JSON.stringify(refs);
    if (mergedRefstring) {
      await AsyncStorage.setItem(StorageKeys.referrals, mergedRefstring);
      Alert.alert("Referral item saved successfully");
    } else {
      console.log("Nothing to save");
    }
  } else {
    Alert.alert(
      "ERROR SAVING ITEM",
      "Referral item could not be saved.\n Please enter the item again."
    );
  }

  navigation.navigate("ReferralList");
}

const styles = StyleSheet.create({});
