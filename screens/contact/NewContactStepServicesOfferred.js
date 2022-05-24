import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../config/Colors";
import { AppForm, AppFormField } from "../../components/form";
import AppFormPicker from "../../components/form/AppFormPicker";
import AppButtonSmall from "../../components/wrappers/AppButtonSmall";
import AppSubmitButtonSmall from "../../components/form/AppSubmitButtonSmall";
import YesNo from "../../models/YesNo";
import AppFormRadio from "../../components/form/AppFormRadio";
import Position from "../../models/Position";
import StorageKeys from "../../utils/StorageKeys";
import AppFormCheckBox from "../../components/form/AppFormCheckBox";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NewContactStepServicesOfferred({
  initValues,
  validationSchema,
  onNextStep,
  onBack,
}) {
  const [eacdone, setEACDone] = useState(false);
  const [patient, setPatient] = useState(null);
  const [services, setServices] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const patientString = await AsyncStorage.getItem(StorageKeys.patient);
        let p = JSON.parse(patientString);
        setPatient(p);
        const servicesString = await AsyncStorage.getItem(
          StorageKeys.servicesOfferedKey
        );
        let s = JSON.parse(servicesString);
        setServices(s);
        const posString = await Position();
        let po = JSON.parse(posString);
        setPositions(po);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);
  const EACS = [
    { label: "Eac 1", value: "eac1" },
    { label: "Eac 2", value: "eac2" },
    { label: "Eac 3", value: "eac3" },
  ];

  const formattedServices = services?.map((s) => {
    return { label: s.name, value: s.id };
  });

  const formattedPositions = positions?.map((p) => {
    return { label: p.name, value: p.id };
  });

  return (
    <AppForm
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={onNextStep}
    >
      <AppFormCheckBox
        name={"serviceOffereds"}
        items={formattedServices}
        label={"Services Offered"}
      />

      <AppFormPicker
        icon={"none"}
        items={YesNo}
        label={"EAC Done?"}
        name="eac"
        callback={setEACDone}
      />
      {eacdone === "0" && (
        <AppFormRadio
          items={EACS}
          name="whichEac"
          label={"Which Session?"}
          row="column"
        />
      )}

      <AppFormPicker
        icon={"none"}
        items={formattedPositions}
        label={"Position of cadre"}
        name="position"
      />
      <AppFormField
        name={"contactMadeBy"}
        placeholder={"Contact Made By?"}
        label="Contact Made By"
      />

      <View style={styles.buttonContainer}>
        <AppButtonSmall title={"Back"} onPress={onBack} />
        <AppSubmitButtonSmall
          color={"bluish"}
          title="Save"
          isLoading={false}
          loadingLabel="Saving..."
        />
      </View>
    </AppForm>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.light,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 40,
  },
});
