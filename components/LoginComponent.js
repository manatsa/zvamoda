import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import * as yup from "yup";
import colors from "../config/Colors";
import { AppForm, AppFormField } from "./form";
import AppFormLoadingSubmit from "./form/AppFormLoadingSubmit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKeys from "../utils/StorageKeys";
import GetFromApi from "../api/GetAxiosClient";
import LoginToApi from "../api/LoginToApi";
import PersistCache from "../storage/PersistStorage";
import { AxiosError } from "axios";

function LoginComponent({ navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const [dbError, setDBError] = useState("");
  const [user, setUser] = useState(null);

  const segment = "/patient/initial-statics?email=";
  const login = "/authenticate";

  const appHandleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await LoginToApi(
        { username: values.username, password: values.password },
        login
      );

      const token = response?.data;

      if (!token || token?.length === 0) {
        return;
      }
      await AsyncStorage.setItem(StorageKeys.tokenKey, token);

      const listResponse = await GetFromApi(
        token,
        segment + values?.username
      ).catch((error) => {
        Alert.alert("ERROR Fetching Data", error?.toJSON()?.message);
      });

      if (listResponse?.status === 200) {
        await PersistCache(listResponse?.data, {
          username: values.username,
          password: values.password,
        }).catch((error) => {
          Alert.alert("Data Storage Error", String(error));
        });
        navigation.navigate("patients", {
          patients: listResponse?.data?.patients,
        });
      } else {
        Alert.alert("Error While Synchronizing", listResponse?.statusText);
      }
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = yup.object({
    username: yup
      .string()
      .required("Username can not be empty!")
      .min(3, "The username is too short"),
    password: yup
      .string()
      .required("Password cannot be empty!")
      .min(3, "A minimum of 3 characters is expected!"),
  });
  const initialValues = {
    username: "",
    password: "",
  };

  return (
    <View style={styles.container}>
      <AppForm
        initialValues={initialValues}
        onSubmit={appHandleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          name="username"
          icon="account-circle"
          keyBoardType={"email-address"}
          autoFocus
          autoCapitalize={"none"}
          autoCorrect={false}
          returnKeyType="next"
          returnKeyLabel="Next"
          placeholder="username"
        />

        <AppFormField
          name="password"
          icon="lock"
          autoCapitalize={"none"}
          autoCorrect={false}
          secureTextEntry
          placeholder="password"
        />
        <AppFormLoadingSubmit
          title={"Login"}
          isLoading={isLoading}
          loadingLabel={"Sync in progress...wait"}
          color="secondary"
        />
      </AppForm>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    borderColor: colors.secondary,
    padding: 5,
  },
});
export default LoginComponent;
