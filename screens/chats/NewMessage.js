import { Alert, Easing, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import AppZoomOutScreenCenter from "../../components/animatedContainers/AppZoomOutScreenCenter";
import { AppForm, AppFormField } from "../../components/form";
import messageInitValues from "../../models/formVars/messageInitValues";
import messageValidationSchema from "../../models/formVars/messageValidationSchema";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKeys from "../../utils/StorageKeys";
import PostToApi from "../../api/PostAxiosClient";
import AppFormLoadingSubmit from "../../components/form/AppFormLoadingSubmit";

const endpoint = "/patient/add-messages";
export default function NewMessage() {
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
          Alert.alert("Message Status", "Message sent successfully!");
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
        initialValues={messageInitValues}
        validationSchema={messageValidationSchema}
        onSubmit={submitHandler}
      >
        <AppFormField
          name={"message"}
          label={"Enter Message"}
          placeholder={"message"}
        />
        <AppFormField
          name={"details"}
          label={"Enter any other details"}
          placeholder={"enter details"}
          numberOfLines={4}
          multiline={true}
        />
        <View style={styles.buttonContainer}>
          <AppFormLoadingSubmit
            title={"Send"}
            isLoading={isLoading}
            color={"secondary"}
          />
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
