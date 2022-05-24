import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../config/Colors";
import { AppForm } from "../../components/form";
import AppButtonSmall from "../../components/wrappers/AppButtonSmall";
import AppSubmitButtonSmall from "../../components/form/AppSubmitButtonSmall";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKeys from "../../utils/StorageKeys";
import AppFormCheckBox from "../../components/form/AppFormCheckBox";

export default function NewReferralServicesRequestedStep1({
  initValues,
  validationSchema,
  onNextStep,
  onBack,
}) {
  const [hivStiServicesAvailed, setHivStiServicesAvailed] = useState([]);
  const [oiArtAvailed, setOiArtAvailed] = useState([]);
  const [srhAvailed, setSrhAvailed] = useState([]);
  let formattedService = {};
  useEffect(() => {
    const getData = async () => {
      try {
        const hiv = await AsyncStorage.getItem(
          StorageKeys.hivStiServicesReqKey
        );
        let h = JSON.parse(hiv);
        formattedService = h.map((s) => {
          return { label: s.name, value: s.id };
        });
        setHivStiServicesAvailed(formattedService);
        const oi = await AsyncStorage.getItem(StorageKeys.oiArtReqKey);
        let o = JSON.parse(oi);
        formattedService = o.map((s) => {
          return { label: s.name, value: s.id };
        });
        setOiArtAvailed(formattedService);

        const sr = await AsyncStorage.getItem(StorageKeys.srhReqKey);
        let s = JSON.parse(sr);
        formattedService = s.map((s) => {
          return { label: s.name, value: s.id };
        });
        setSrhAvailed(formattedService);
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
        name={"hivStiServicesReq"}
        items={hivStiServicesAvailed}
        label={"HIV/STI Services Requested"}
      />
      <AppFormCheckBox
        name={"oiArtReq"}
        items={oiArtAvailed}
        label={"OI/ART Services Requested"}
      />
      <AppFormCheckBox
        name={"srhReq"}
        items={srhAvailed}
        label={"SRH Services Requested"}
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
