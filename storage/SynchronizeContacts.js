import StorageKeys from "../utils/StorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PostToApi from "../api/PostAxiosClient";

export default async function SynchronizeContacts(token) {
  const segment = "/patient/add-contacts";
  const contacts = await AsyncStorage.getItem(StorageKeys.contacts);
  let code = null;
  if (contacts) {
    const response = await PostToApi(token, segment, contacts);
    code = response?.code;
    if (code === 200) {
      await AsyncStorage.removeItem(StorageKeys.contacts);
    }
  } else {
    code = -1;
  }

  return code;
}
