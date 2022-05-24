import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Colors from "../../config/Colors";
import { AppForm } from "../../components/form";
import AppFormPicker from "../../components/form/AppFormPicker";
import AppSubmitButtonSmall from "../../components/form/AppSubmitButtonSmall";
import YesNo from "../../models/YesNo";
import AppButtonSmall from "../../components/wrappers/AppButtonSmall";
import KeyPopulation from "../../models/KeyPopulation";
import DisclosureType from "../../models/DisclosureType";
import HIVDisclosureLocation from "../../models/HIVDisclosureLocation";
import TransmissionMode from "../../models/TransmissionMode";
import AppDateComponent from "../../components/wrappers/AppDateComponent";

export default function NewClientDisclosureDetailsStep({
  initValues,
  validationSchema,
  onNextStep,
  onBack,
}) {
  const [keyPopulation, setKeyPopulation] = useState("");
  const [hivStatusKnown, setHivStatusKnown] = useState("");

  //   useEffect(() => {
  //     const getData = async () => {
  //       try {
  //         const edu = await AsyncStorage.getItem(StorageKeys.educationKey);
  //         let e = JSON.parse(edu);
  //         setEducation(e);
  //         const eduLevel = await AsyncStorage.getItem(
  //           StorageKeys.educationLevelKey
  //         );
  //         let el = JSON.parse(eduLevel);
  //         setEducationLevel(el);
  //         const reason = await AsyncStorage.getItem(
  //           StorageKeys.reasonForNotReachingOLevelKey
  //         );
  //         let r = JSON.parse(reason);
  //         setReasonNotOLevel(r);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     getData();
  //   }, []);

  return (
    <AppForm
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={onNextStep}
    >
      <AppFormPicker
        icon={"none"}
        items={YesNo}
        label={"Is Key Population?"}
        name="isKeypopulation"
        callback={setKeyPopulation}
      />
      {keyPopulation === "0" && (
        <>
          <AppFormPicker
            icon={"none"}
            items={KeyPopulation}
            label={"Select Key Population"}
            name="keyPopulation"
          />
        </>
      )}

      <AppFormPicker
        icon={"none"}
        items={YesNo}
        label={"HIV Status Known?"}
        name="hivStatusKnown"
        callback={setHivStatusKnown}
      />

      {hivStatusKnown === "0" && (
        <>
          <AppDateComponent name={"dateTested"} label={"Select Test Date"} />

          <AppFormPicker
            icon={"none"}
            items={DisclosureType}
            label={"Type of Disclosure"}
            name="disclosureType"
          />

          <AppFormPicker
            icon={"none"}
            items={HIVDisclosureLocation}
            label={"Disclosure Location"}
            name="hIVDisclosureLocation"
          />

          <AppFormPicker
            icon={"none"}
            items={TransmissionMode}
            label={"Transmission Mode"}
            name="transmissionMode"
          />
        </>
      )}

      <AppFormPicker
        icon={"none"}
        items={YesNo}
        label={"Consent To Mental Health"}
        name="consentToMHealth"
      />

      <AppDateComponent name={"dateJoined"} label={"Date joined zvandiri"} />

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
