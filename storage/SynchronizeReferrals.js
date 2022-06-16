import { Alert, StyleSheet } from "react-native";
import React from "react";
import StorageKeys from "../utils/StorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PostToApi from "../api/PostAxiosClient";

export default async function SynchronizeReferrals(token) {
  const refSegment = "/patient/add-referrals";
  const refs = await AsyncStorage.getItem(StorageKeys.referrals);
  let code = null;
  if (refs) {
    const response = await PostToApi(
      token,
      refSegment,
      refs,
      "REFERRALS"
    ).catch((error) => {
      console.log(error.toJSON());
      Alert.alert("REFRRALS SYNCH ERROR", error.toJSON().message);
    });
    code = response?.status;
    if (code === 200) {
      await AsyncStorage.removeItem(StorageKeys.referrals);
    }
  } else {
    code = -1;
  }

  return code;
}

const styles = StyleSheet.create({});
