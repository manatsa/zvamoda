import { Alert, StyleSheet } from "react-native";
import React from "react";
import StorageKeys from "../utils/StorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PostToApi from "../api/PostAxiosClient";

export default async function SynchronizeClients(token) {
  const clientSegment = "/patient/add-patients";
  const clients = await AsyncStorage.getItem(StorageKeys.newPatientsKey);
  let code = null;
  if (clients) {
    const response = await PostToApi(token, clientSegment, clients);
    code = response?.code;
    if (code === 200) {
      await AsyncStorage.removeItem(StorageKeys.newPatientsKey);
    }
  } else {
    code = -1;
  }

  return code;
}

const styles = StyleSheet.create({});
