import { ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AppFacilityAccordion from "../../components/AppFacilityAccordion";
import StorageKeys from "../../utils/StorageKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DistrictLineItems({ route, navigation }) {
  const districtData = route?.params?.data || [];
  const district = route?.params?.district;

  return (
    <ScrollView contentContainerStyle={{ padding: 10 }}>
      <AppFacilityAccordion items={districtData} district={district} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
