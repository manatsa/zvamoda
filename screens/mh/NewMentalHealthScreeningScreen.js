import { ActivityIndicator, Easing, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import mhInitValues from "../../models/formVars/mhInitValues";
import mhValidationSchema from "../../models/formVars/mhValidationSchema";
import { AppForm, AppSubmitButton } from "../../components/form";
import AppFormPicker from "../../components/form/AppFormPicker";
import YesNo from "../../models/YesNo";
import IdentifiedRisks from "../../models/IdentifiedRisks";
import Supports from "../../models/Supports";
import Colors from "../../config/Colors";
import AppFormCheckBox from "../../components/form/AppFormCheckBox";
import SavePatientMHScreening from "../patient/SaveMentalhealthScreening";
import StorageKeys from "../../utils/StorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HelperText } from "react-native-paper";
import AppFlipXScreenCenter from "../../components/animatedContainers/AppFlipXScreenCenter";
import AppDatePicker from "../../components/wrappers/AppDatePicker";

export default function NewMentalHealthScreeningScreen({ navigation }) {
  const [screened, setScreened] = useState("0");
  const [risk, setRisk] = useState(false);
  const [support, setSupport] = useState(false);
  const [patient, setPatient] = useState(null);
  const [working, setWorking] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const patientString = await AsyncStorage.getItem(StorageKeys.patient);
        let p = JSON.parse(patientString);
        setPatient(p);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const onSubmit = async (values, { resetForm }) => {
    setWorking(true);
    resetForm();
    try {
      await SavePatientMHScreening(values, patient, navigation);
    } finally {
      setWorking(false);
      setPatient(patient);
    }
  };

  return (
    <AppFlipXScreenCenter easing={Easing.in} duration={1000}>
      {working && (
        <View style={styles.activityIndicator}>
          <ActivityIndicator
            animating={true}
            color={Colors.danger}
            size={"large"}
          />
          <HelperText>{" Please wait..."}</HelperText>
        </View>
      )}
      <AppForm
        initialValues={mhInitValues}
        validationSchema={mhValidationSchema}
        onSubmit={onSubmit}
      >
        <AppFormPicker
          name={"screenedForMentalHealth"}
          items={YesNo}
          label="Screening Done?"
          icon={"none"}
          callback={setScreened}
        />
        {screened === "0" && (
          <>
            {/* <AppDateComponent
              name={"dateScreened"}
              label={"Date Screened"}
              color={Colors.primary}
            /> */}
            <AppDatePicker
              name={"dateScreened"}
              label={"Date Screened"}
              color={Colors.primary}
            />

            <AppFormPicker
              name={"risk"}
              items={YesNo}
              label="Any risk Identified?"
              icon={"none"}
              callback={setRisk}
            />

            {risk === "0" && screened === "0" && (
              <>
                <AppFormCheckBox
                  items={IdentifiedRisks}
                  label="Identified Risks"
                  name={"identifiedRisks"}
                />
                <AppFormPicker
                  name={"referral"}
                  items={YesNo}
                  label="Client Referred?"
                  icon={"none"}
                />
                <AppFormPicker
                  name={"support"}
                  items={YesNo}
                  label="Support Available?"
                  icon={"none"}
                  callback={setSupport}
                />
                {support === "0" && risk === "0" && screened === "0" && (
                  <>
                    <AppFormCheckBox
                      items={Supports}
                      label="Client Support"
                      name={"supports"}
                    />
                  </>
                )}
              </>
            )}
          </>
        )}
        <View style={styles.buttonContainer}>
          <AppSubmitButton title={"Save"} />
        </View>
      </AppForm>
    </AppFlipXScreenCenter>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingVertical: 20,
    margin: 10,
  },
  container: {
    flex: 1,
    width: "100%",
  },
});
