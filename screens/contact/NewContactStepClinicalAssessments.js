import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../config/Colors";
import { AppForm } from "../../components/form";
import AppButtonSmall from "../../components/wrappers/AppButtonSmall";
import AppSubmitButtonSmall from "../../components/form/AppSubmitButtonSmall";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKeys from "../../utils/StorageKeys";
import AppFormCheckBox from "../../components/form/AppFormCheckBox";

export default function NewContactStepClinicalAssessments({
  initValues,
  validationSchema,
  onNextStep,
  onBack,
}) {
  const [assessments, setAssessments] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const assessString = await AsyncStorage.getItem(
          StorageKeys.assessmentsKey
        );
        let s = JSON.parse(assessString);
        setAssessments(s);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const clinicalAssessments = assessments
    .filter((s) => s.contactAssessment === "Clinical")
    .map((s) => {
      return { label: s.name, value: s.id };
    });

  return (
    <AppForm
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={onNextStep}
    >
      <AppFormCheckBox
        name={"clinicalAssessments"}
        items={clinicalAssessments}
        label={"Clinical Assessments"}
      />

      <View style={styles.buttonContainer}>
        <AppButtonSmall title={"Back"} onPress={onBack} />
        <AppSubmitButtonSmall title={"Next"} />
      </View>
    </AppForm>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "scroll",
    backgroundColor: Colors.light,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
    paddingVertical: 40,
  },
});
