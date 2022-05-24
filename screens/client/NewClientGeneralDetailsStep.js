import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../config/Colors";
import { AppForm, AppFormField } from "../../components/form";
import AppFormPicker from "../../components/form/AppFormPicker";
import AppSubmitButtonSmall from "../../components/form/AppSubmitButtonSmall";
import YesNo from "../../models/YesNo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKeys from "../../utils/StorageKeys";
import MaritalStatus from "../../models/MaritalStatus";
import AppButtonSmall from "../../components/wrappers/AppButtonSmall";
import OrphanageStatus from "../../models/OrphanageStatus";
import AppDateComponent from "../../components/wrappers/AppDateComponent";

export default function NewClientGeneralDetailsStep({
  initValues,
  validationSchema,
  onNextStep,
  onBack,
}) {
  const [education, setEducation] = useState([]);
  const [educationLevel, setEducationLevel] = useState([]);
  const [reasonNoOlevel, setReasonNotOLevel] = useState([]);
  const [hasDisability, setDiability] = useState(false);
  const [notReachedOLevel, setReasons] = useState("");
  const [inSchool, setInSchool] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const edu = await AsyncStorage.getItem(StorageKeys.educationKey);
        let e = JSON.parse(edu);
        setEducation(e);
        const eduLevel = await AsyncStorage.getItem(
          StorageKeys.educationLevelKey
        );
        let el = JSON.parse(eduLevel);
        setEducationLevel(el);
        const reason = await AsyncStorage.getItem(
          StorageKeys.reasonForNotReachingOLevelKey
        );
        let r = JSON.parse(reason);
        setReasonNotOLevel(r);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const filteredEducation = education.map((e) => {
    return { label: e.name, value: e.id };
  });
  const filteredEducationLevel = educationLevel.map((e) => {
    return { label: e.name, value: e.id };
  });

  const filteredReasons = reasonNoOlevel.map((r) => {
    return { label: r.name, value: r.id };
  });

  return (
    <AppForm
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={onNextStep}
    >
      <AppFormPicker
        icon={"none"}
        items={OrphanageStatus}
        label={"Client Orphan Status"}
        name="orphanStatus"
      />
      <AppFormPicker
        icon={"none"}
        items={MaritalStatus}
        label={"Client Marital Status"}
        name="maritalStatus"
      />

      <AppFormPicker
        icon={"none"}
        items={YesNo}
        label={"On ARVs"}
        name="onArvs"
      />

      <AppFormPicker
        icon={"none"}
        items={YesNo}
        label={"On Cotrimoxazole"}
        name="onCotrimoxazole"
      />

      <AppFormField
        name="artRegimen"
        label={"Art regimen"}
        placeholder={"art regimen"}
      />

      <AppDateComponent
        name={"dateStartedTreatment"}
        label={"Date Started Treatment"}
      />

      <AppFormPicker
        icon={"none"}
        items={YesNo}
        label={"Has Disability?"}
        name="disability"
        callback={setDiability}
      />

      {hasDisability === "0" && (
        <AppFormField
          name="disablityType"
          label={"Disability Type"}
          placeholder={"disability type"}
        />
      )}

      <AppFormPicker
        icon={"none"}
        items={filteredEducation}
        label={"Client In school?"}
        name="education"
        callback={setInSchool}
      />

      <AppFormPicker
        icon={"none"}
        items={filteredEducationLevel}
        label={"Eduaction Level"}
        name="educationLevel"
        callback={setReasons}
      />

      {(notReachedOLevel === "95b4ff59-ff34-4177-a6dc-a8bf9c0e6998" ||
        inSchool === "1") && (
        <AppFormPicker
          icon={"none"}
          items={filteredReasons}
          label={"Why client not reached O-Level?"}
          name="reasonForNotReachingOLevel"
        />
      )}

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
    height: "100%",
    backgroundColor: Colors.light,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
    paddingVertical: 40,
  },
});
