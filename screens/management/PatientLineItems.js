import { ScrollView, StyleSheet } from "react-native";
import React from "react";
import AppPatientAccordion from "../../components/AppPatientAccordion";

export default function PatientLineItems({ route, navigation }) {
  const personData = route?.params?.data || [];
  const patient = route?.params?.patient;

  return (
    <ScrollView contentContainerStyle={{ padding: 10 }}>
      <AppPatientAccordion items={personData} patient={patient} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
