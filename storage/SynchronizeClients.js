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
    const response = await PostToApi(
      token,
      clientSegment,
      clients,
      "CLIENTS"
    ).catch((error) => {
      //console.log(error.toJSON());
      Alert.alert("CLIENTS SYNCH ERROR", error.toJSON().message);
    });
    code = response?.status;
    const data = response?.data;

    if (code === 200) {
      const allClientsString = await AsyncStorage.getItem(
        StorageKeys.patientListKey
      );
      if (data && data?.length > 0 && allClientsString) {
        const allClients = JSON.parse(allClientsString);
        data?.forEach((p) => {
          allClients.push(p);
        });

        await AsyncStorage.setItem(
          StorageKeys.patientListKey,
          JSON.stringify(allClients)
        );
      }

      await AsyncStorage.removeItem(StorageKeys.newPatientsKey);
    }
  } else {
    code = -1;
  }

  return code;
}

const styles = StyleSheet.create({});
