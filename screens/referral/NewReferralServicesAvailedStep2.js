import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../config/Colors";
import { AppForm } from "../../components/form";
import AppButtonSmall from "../../components/wrappers/AppButtonSmall";
import AppSubmitButtonSmall from "../../components/form/AppSubmitButtonSmall";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKeys from "../../utils/StorageKeys";
import AppFormCheckBox from "../../components/form/AppFormCheckBox";

export default function NewReferralServicesAvailedStep2({
  initValues,
  validationSchema,
  onNextStep,
  onBack,
}) {
  const [laboratoryAvailed, setLaboratoryAvailed] = useState([]);
  const [tbAvailed, setTbAvailed] = useState([]);
  const [psychAvailed, setPsychAvailed] = useState([]);
  const [legalAvailed, setLegalAvailed] = useState([]);
  let formattedService = {};
  useEffect(() => {
    const getData = async () => {
      try {
        const lab = await AsyncStorage.getItem(StorageKeys.laboratoryReqKey);
        let l = JSON.parse(lab);
        formattedService = l.map((s) => {
          return { label: s.name, value: s.id };
        });
        setLaboratoryAvailed(formattedService);

        const tb = await AsyncStorage.getItem(StorageKeys.tbReqKey);
        let t = JSON.parse(tb);
        formattedService = t.map((s) => {
          return { label: s.name, value: s.id };
        });
        setTbAvailed(formattedService);

        const ps = await AsyncStorage.getItem(StorageKeys.psychReqKey);
        let p = JSON.parse(ps);
        formattedService = p.map((s) => {
          return { label: s.name, value: s.id };
        });
        setPsychAvailed(formattedService);

        const leg = await AsyncStorage.getItem(StorageKeys.legalReqKey);
        let lg = JSON.parse(leg);
        formattedService = lg.map((s) => {
          return { label: s.name, value: s.id };
        });
        setLegalAvailed(formattedService);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <AppForm
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={onNextStep}
    >
      <AppFormCheckBox
        name={"laboratoryAvailed"}
        items={laboratoryAvailed}
        label={"Lab Services Availed"}
      />

      <AppFormCheckBox
        name={"psychAvailed"}
        items={psychAvailed}
        label={"Psycho-Social Services Availed"}
      />

      <AppFormCheckBox
        name={"tbAvailed"}
        items={tbAvailed}
        label={"TB Services Availed"}
      />

      <AppFormCheckBox
        name={"legalAvailed"}
        items={legalAvailed}
        label={"Legal Services Availed"}
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
