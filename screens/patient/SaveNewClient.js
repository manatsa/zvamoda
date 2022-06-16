import { Alert, StyleSheet } from "react-native";
import StorageKeys from "../../utils/StorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function SaveNewClient(values, navigation) {
  let current = await AsyncStorage.getItem(StorageKeys.newPatientsKey);
  let clients = [];
  if (current) {
    clients = JSON.parse(current);
  }

  let newValues = {
    ...values,
  };

  if (newValues.primaryClinic && newValues.primaryClinic.length > 0) {
    clients.push(newValues);
    const mergedClientsString = JSON.stringify(clients);
    if (mergedClientsString) {
      await AsyncStorage.setItem(
        StorageKeys.newPatientsKey,
        mergedClientsString
      );
      Alert.alert("New Client saved successfully");
    } else {
      console.log("Nothing to save");
    }
  } else {
    Alert.alert(
      "ERROR SAVING ITEM",
      "Patient item could not be saved.\n Please enter the item again."
    );
  }

  navigation.navigate("ClientList");
}

const styles = StyleSheet.create({});
