import StorageKeys from "../utils/StorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PostToApi from "../api/PostAxiosClient";
import { Alert } from "react-native";

export default async function SynchronizeContacts(token) {
  const segment = "/patient/add-contacts";
  const contacts = await AsyncStorage.getItem(StorageKeys.contacts);
  let code = null;
  if (contacts) {
    const response = await PostToApi(
      token,
      segment,
      contacts,
      "CONTACTS"
    ).catch((error) => {
      console.log(error.toJSON());
      Alert.alert("CONTACTS SYNCH ERROR", error.toJSON().message);
    });
    code = response?.status;
    if (code === 200) {
      await AsyncStorage.removeItem(StorageKeys.contacts);
    }
  } else {
    code = -1;
  }

  return code;
}
