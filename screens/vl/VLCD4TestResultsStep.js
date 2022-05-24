import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { AppForm, AppFormField } from "../../components/form";
import TestType from "../../models/TestType";
import AppFormPicker from "../../components/form/AppFormPicker";
import AppSubmitButtonSmall from "../../components/form/AppSubmitButtonSmall";
import AppButtonSmall from "../../components/wrappers/AppButtonSmall";
import AppTextInput from "../../components/wrappers/AppTextInput";
import AppFormSingleCheckBox from "../../components/form/AppFormSingleCheckBox";
import YesNo from "../../models/YesNo";
import AppCallbackFormField from "../../components/form/AppCallbackFormField";

export default function VLCD4GeneralDetailsStep({
  initValues,
  validationSchema,
  onNextStep,
  onBack,
}) {
  const [results, setResults] = useState("");
  const exclusiveResult = (checkValue, setFieldValue) => {
    if (checkValue) {
      setFieldValue("result", "");
    }
  };

  const exclusiveTextResult = (textValue, setFieldValue) => {
    if (textValue) {
      setFieldValue("tnd", false);
    }
  };

  return (
    <AppForm
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={onNextStep}
    >
      <AppFormPicker
        name={"haveResult"}
        items={YesNo}
        label={"Results Available "}
        callback={setResults}
        icon={"none"}
      />
      {results === "0" && (
        <AppFormField
          name={"result"}
          placeholder="Enter numeric result or tnd"
          //keyboardType={"numeric"}
          // callback={exclusiveTextResult}
        />
      )}

      {/* {results === "0" && (
        <AppFormSingleCheckBox
          name={"tnd"}
          callback={exclusiveResult}
          label={"TND"}
        />
      )} */}

      <View style={styles.buttonContainer}>
        <AppButtonSmall title={"Back"} onPress={onBack} />
        <AppSubmitButtonSmall title={"Save"} />
      </View>
    </AppForm>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
    paddingVertical: 40,
  },
});
