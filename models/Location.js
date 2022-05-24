import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKeys from "../utils/StorageKeys";

const getData = async () => {
  const response = await AsyncStorage.getItem(StorageKeys.locationsKey);
  return response;
};
const Location = () => {
  return getData();
};
export default Location;
