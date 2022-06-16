import React from "react";
import StorageKeys from "../utils/StorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PostToApi from "../api/PostAxiosClient";
import { Alert } from "react-native";

export default async function SynchronizeMHScreening(token) {
  const mhSegment = "/patient/add-mental-health-screening-items";
  const mhs = await AsyncStorage.getItem(StorageKeys.mhScreeningKey);
  let code = null;
  if (mhs) {
    const response = await PostToApi(
      token,
      mhSegment,
      mhs,
      "MH SCREENING"
    ).catch((error) => {
      console.log(error.toJSON());
      Alert.alert("MH SCREENING SYNCH ERROR", error.toJSON().message);
    });
    code = response?.status;
    if (code === 200) {
      await AsyncStorage.removeItem(StorageKeys.mhScreeningKey);
    }
  } else {
    code = -1;
  }

  return code;
}
