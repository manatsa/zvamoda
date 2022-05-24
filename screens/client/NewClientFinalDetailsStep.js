import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../config/Colors";
import { AppForm, AppFormField } from "../../components/form";
import AppFormPicker from "../../components/form/AppFormPicker";
import AppSubmitButtonSmall from "../../components/form/AppSubmitButtonSmall";
import YesNo from "../../models/YesNo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKeys from "../../utils/StorageKeys";
import Gender from "../../models/Gender";
import AppButtonSmall from "../../components/wrappers/AppButtonSmall";

export default function NewClientFinalDetailsStep({
  initValues,
  validationSchema,
  onNextStep,
  onBack,
}) {
  const [self, setSelf] = useState("");
  const [referers, setReferrers] = useState([]);
  const [relations, setRelations] = useState([]);

  const getData = async () => {
    const ref = await AsyncStorage.getItem(StorageKeys.refererKey);
    setReferrers(JSON.parse(ref));
    const rel = await AsyncStorage.getItem(StorageKeys.relationshipKey);
    let rs = JSON.parse(rel);
    setRelations(rs);
  };

  useEffect(() => {
    getData();
  }, []);

  const filteredRelations = relations.map((r) => {
    return { label: r.name, value: r.id };
  });

  const filteredReferers = referers.map((r) => {
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
        items={YesNo}
        label={"Registering self?"}
        name={"selfPrimaryCareGiver"}
        callback={setSelf}
      />
      {self === "1" && (
        <>
          <AppFormField
            name={"pfirstName"}
            label={"Caregiver First Name"}
            placeholder={"first name"}
          />

          <AppFormField
            name={"plastName"}
            label={"Caregiver Last Name"}
            placeholder={"last name"}
          />

          <AppFormField
            name={"pmobileNumber"}
            label={"Caregiver Mobile Number"}
            placeholder={"mobile number"}
          />

          <AppFormPicker
            icon={"none"}
            items={Gender}
            label={"Select Gender"}
            name={"pgender"}
          />

          <AppFormPicker
            icon={"none"}
            items={filteredRelations}
            label={"Select Relationship"}
            name={"relationship"}
          />
        </>
      )}

      <AppFormPicker
        icon={"none"}
        items={filteredReferers}
        label={"Select Referrer"}
        name={"referer"}
      />

      <AppFormField
        name={"refererName"}
        label={"Referrer's Name"}
        placeholder={"referrer's name"}
      />

      <View style={styles.buttonContainer}>
        <AppButtonSmall title={"Back"} onPress={onBack} />
        <AppSubmitButtonSmall title={"Save"} />
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
