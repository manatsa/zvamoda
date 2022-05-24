import { StyleSheet, View } from "react-native";
import React from "react";
import Colors from "../../config/Colors";
import { AppForm, AppFormField } from "../../components/form";
import AppSubmitButtonSmall from "../../components/form/AppSubmitButtonSmall";
import AppDateComponent from "../../components/wrappers/AppDateComponent";

export default function NewReferralGeneralInfoStep({
  initValues,
  validationSchema,
  onNextStep,
  onBack,
}) {
  return (
    <AppForm
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={onNextStep}
    >
      <AppDateComponent name="referralDate" label="Referral Date" />

      <AppDateComponent name="expectedVisitDate" label="Expected Visit Date" />

      <AppFormField
        name="organisation"
        placeholder="Enter Organisation"
        icon="none"
      />

      <AppDateComponent name="dateAttended" label="Date Attended" />

      <AppFormField
        name="designation"
        placeholder="Enter Designation"
        icon="none"
      />

      <AppFormField
        name="attendingOfficer"
        placeholder="Attending Officer"
        icon="none"
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
