import React from "react";
import StorageKeys from "../utils/StorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PostToApi from "../api/PostAxiosClient";
import { Alert } from "react-native";

export default async function SynchronizeTBScreening(token) {
  const tbSegment = "/patient/add-tb-tpt-screening-items";
  const tbs = await AsyncStorage.getItem(StorageKeys.tbScreeningKey);
  let code = null;

  if (tbs) {
    const response = await PostToApi(token, tbSegment, tbs, "TB/TPT").catch(
      (error) => {
        console.log(error.toJSON());
        Alert.alert("TB/TPT SYNCH ERROR", error.toJSON().message);
      }
    );

    code = response?.status;
    if (code === 200) {
      await AsyncStorage.removeItem(StorageKeys.tbScreeningKey);
    }
  } else {
    code = -1;
  }

  return code;
}
