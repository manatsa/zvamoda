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
import AppFormPicker from "../../components/form/AppFormPicker";
import FeaturePlatform from "../../models/FeaturePlatform";
import featureRequestInitValues from "../../models/formVars/featureRequestInitValues";
import featureRequestValidation from "../../models/formVars/featureRequestValidation";

const endpoint = "/patient/add-features-request";
export default function NewFeatureRequest() {
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
          Alert.alert(
            "Feature Request Status",
            "Feature Request sent successfully!"
          );
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
        initialValues={featureRequestInitValues}
        validationSchema={featureRequestValidation}
        onSubmit={submitHandler}
      >
        <AppFormField
          name={"feature"}
          label={"Enter Feature Short Description"}
          placeholder={"feature short decsription"}
        />
        <AppFormField
          name={"purpose"}
          label={"Enter Purpose of the Feature"}
          placeholder={"enter feature purpose"}
          numberOfLines={3}
          multiline={true}
        />
        <AppFormPicker
          name={"platform"}
          label={"Select Implementation Platform"}
          icon={"none"}
          items={FeaturePlatform}
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
