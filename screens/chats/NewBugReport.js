import { Alert, Easing, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AppZoomOutScreenCenter from "../../components/animatedContainers/AppZoomOutScreenCenter";
import { AppForm, AppFormField, AppSubmitButton } from "../../components/form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKeys from "../../utils/StorageKeys";
import bugReportInitValues from "../../models/formVars/bugReportInitValues";
import bugValidationSchema from "../../models/formVars/bugValidationSchema";
import PostToApi from "../../api/PostAxiosClient";

const endpoint = "/patient/add-bug-reports";
export default function NewBugReport() {
  const [isLoading, setIsLoading] = useState(false);
  const submitHandler = async (values, { resetForm }) => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem(StorageKeys.tokenKey);
      if (token && token.length > 0) {
        const response = await PostToApi(
          token,
          endpoint,
          JSON.stringify(values)
        );
        if (response.code === 200) {
          Alert.alert("Report Status", "Bug Report sent successfully!");
        }
      } else {
        Alert.alert("Login Status", "Please login first!");
      }
    } finally {
      resetForm();
      setIsLoading(false);
    }
  };

  return (
    <AppZoomOutScreenCenter easing={Easing.in} duration={1000}>
      <AppForm
        initialValues={bugReportInitValues}
        validationSchema={bugValidationSchema}
        onSubmit={submitHandler}
      >
        <AppFormField
          name={"bug"}
          label={"Enter bug short description"}
          placeholder={"bug description"}
        />
        <AppFormField
          name={"details"}
          label={"Enter any other details"}
          placeholder={"enter details"}
          numberOfLines={4}
          multiline={true}
        />
        <View style={styles.buttonContainer}>
          <AppSubmitButton title={"Send"} />
        </View>
      </AppForm>
    </AppZoomOutScreenCenter>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingVertical: 20,
    margin: 10,
  },
});
