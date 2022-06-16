import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../config/Colors";
import { AppErrorMessage, AppForm, AppFormField } from "../../components/form";
import AppFormPicker from "../../components/form/AppFormPicker";
import Location from "../../models/Location";
import AppSubmitButtonSmall from "../../components/form/AppSubmitButtonSmall";
import PhoneContactOptions from "../../models/PhoneContactOptions";
import CareLevel from "../../models/CareLevel";
import YesNo from "../../models/YesNo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKeys from "../../utils/StorageKeys";
import AppFormNumberInput from "../../components/form/AppFormNumberInput";
import AppDateComponent from "../../components/wrappers/AppDateComponent";
import AppDatePicker from "../../components/wrappers/AppDatePicker";

export default function NewContactStepGeneralInfo({
  initValues,
  validationSchema,
  onNextStep,
  onBack,
}) {
  const [location, setLocation] = useState("");
  const [contactPhoneOption, setContactPhoneOption] = useState("");
  const [patient, setPatient] = useState(null);
  const [locations, setLocations] = useState([]);
  const [smses, setSMSes] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const patientString = await AsyncStorage.getItem(StorageKeys.patient);
        let p = JSON.parse(patientString);
        setPatient(p);
        const locations = await Location();
        let loc = JSON.parse(locations);
        setLocations(loc);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  initValues.careLevel = String(patient?.enhancedStatus);

  const filteredLocations = locations.map((loc) => {
    const ls = { label: loc.name, value: loc.id };
    return ls;
  });

  // const goToNextStep = (values, form) => {
  //   console.log(form);
  //   onNextStep(values);
  // };

  return (
    <AppForm
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={onNextStep}
    >
      {/* <AppDateComponent label={"Date of Contact"} name={"contactDate"} /> */}
      <AppDatePicker name={"contactDate"} label={"Date of Contact"} />
      <AppFormPicker
        icon={"none"}
        items={filteredLocations || []}
        label={"Contact location"}
        name="location"
        callback={setLocation}
      />
      {location === "96b65c7e-b03d-4f2d-8b18-cc3aeb3091db" && (
        <AppFormPicker
          key={"phoneContactOption"}
          icon={"none"}
          items={PhoneContactOptions}
          label={"Phone Option"}
          name="contactPhoneOption"
          callback={setContactPhoneOption}
        />
      )}

      {location === "96b65c7e-b03d-4f2d-8b18-cc3aeb3091db" &&
        contactPhoneOption === "1" && (
          <AppFormNumberInput
            name={"numberOfSms"}
            label={"How many SMSes"}
            textColor={Colors.secondary}
            callback={setSMSes}
          />
        )}
      {location === "96b65c7e-b03d-4f2d-8b18-cc3aeb3091db" &&
        contactPhoneOption === "1" &&
        (!smses || isNaN(+smses) || +smses < 0) && (
          <AppErrorMessage message={"Please specify valid number of SMSes."} />
        )}
      {(location === "2ac6420c-52b0-40f7-b1d3-9499d4119b47" ||
        location === "f8556945-06a1-469e-bec0-e722c807cec9") && (
        <AppFormField
          name="supportGroupTheme"
          label={"Support Group Theme"}
          placeholder={"Support Group Theme"}
        />
      )}

      <AppFormPicker
        icon={"none"}
        items={CareLevel}
        label={"Care Level Before Assessment"}
        name="careLevel"
      />
      <AppFormPicker
        icon={"none"}
        items={CareLevel}
        label={"New Stataus After Assessment"}
        name="careLevelAfterAssessment"
      />
      {/* <AppDateComponent
        label={"Last Appointment Date"}
        name="lastClinicAppointmentDate"
      /> */}
      <AppDatePicker
        name={"lastClinicAppointmentDate"}
        label={"Last Appointment Date"}
      />
      {/* <AppDateComponent
        label={"Next Appointment Date"}
        name="nextClinicAppointmentDate"
      /> */}
      <AppDatePicker
        name={"nextClinicAppointmentDate"}
        label={"Next Appointment Date"}
      />
      <AppFormPicker
        icon={"none"}
        items={YesNo}
        label={"Attended Last Appointment"}
        name="attendedClinicAppointment"
      />
      <View style={styles.buttonContainer}>
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
    alignItems: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 40,
  },
});
