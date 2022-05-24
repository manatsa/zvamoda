import { Alert, StyleSheet } from "react-native";
import React from "react";
import StorageKeys from "../utils/StorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PostToApi from "../api/PostAxiosClient";

export default async function SynchronizeVLCD4s(token) {
  const vlsSegment = "/patient/add-vlcd4s";
  const vls = await AsyncStorage.getItem(StorageKeys.vls);
  let code = null;
  if (vls) {
    const response = await PostToApi(token, vlsSegment, vls);
    code = response?.code;
    if (code === 200) {
      await AsyncStorage.removeItem(StorageKeys.vls);
    }
  } else {
    code = -1;
  }

  return code;
}

const styles = StyleSheet.create({});
