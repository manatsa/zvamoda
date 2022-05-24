import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../config/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKeys from "../../utils/StorageKeys";
import AppButton from "../../components/wrappers/AppButton";

export default function PatientOperationsScreen({ navigation }) {
  const [patient, setPatient] = useState(null);

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

  return (
    <View style={styles.container}>
      <AppButton
        title={"Contacts Data"}
        onPress={() => {
          navigation.navigate("contactDetails", {
            patient: patient,
            screen: "NewContact",
          });
        }}
        color="purple"
      />
      <AppButton
        title={"Referrals Data"}
        onPress={() => {
          navigation.navigate("contactDetails", { patient: patient });
        }}
        color="purple"
      />
      <AppButton
        title={"VL/CD4 Count Data "}
        onPress={() => {
          navigation.navigate("contactDetails", { patient: patient });
        }}
        color="purple"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    backgroundColor: Colors.light,
    flex: 1,
  },
});
