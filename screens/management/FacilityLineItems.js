import { ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AppFacilityAccordion from "../../components/AppFacilityAccordion";
import StorageKeys from "../../utils/StorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function FacilityLineItems({ route, navigation }) {
  const facilityData = route?.params?.data || [];
  const title = route?.params?.title;

  return (
    <ScrollView contentContainerStyle={{ padding: 10 }}>
      <AppFacilityAccordion items={facilityData} title={title} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
