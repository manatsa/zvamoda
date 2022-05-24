import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Easing, Alert } from "react-native";
import AppText from "../../components/wrappers/AppText";
import Colors from "../../config/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKeys from "../../utils/StorageKeys";
import ActionButton from "react-native-circular-action-menu";
import EIcon from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/Ionicons";
import FIcon from "react-native-vector-icons/FontAwesome5";
import { Text } from "react-native-paper";
import MenuBackdrop from "../../utils/MenuBackdrop";
import AppZoomOutScreenCenter from "../../components/animatedContainers/AppZoomOutScreenCenter";
import AppRotateScreenCenter from "../../components/animatedContainers/AppRotateScreenCenter";

function PatientDetailsScreen({ route, navigation }) {
  const [patient, setPatient] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const patientString = await AsyncStorage.getItem(StorageKeys.patient);
      let p = JSON.parse(patientString);
      setPatient(p);
      const uString = await AsyncStorage.getItem(StorageKeys.currentUserKey);
      let u = JSON.parse(uString);
      setUser(u);
    };

    getData();
  }, []);

  // Alert.alert("Patient Age : ", String(patient?.age));
  return (
    <>
      <AppRotateScreenCenter easing={Easing.in} duration={600}>
        <ActionButton
          buttonColor={Colors.secondary}
          radiua={150}
          btnOutRange={Colors.primary}
          outRangeScale={1.3}
          backdrop={<MenuBackdrop />}
          icon={
            <EIcon name="dots-three-vertical" size={25} color={Colors.light} />
          }
          degrees={180}
        >
          <ActionButton.Item
            buttonColor={Colors.secondary}
            size={60}
            title="VL/CD4"
            onPress={async () => {
              if (
                user?.userLevel == "DISTRICT" ||
                user?.userLevel == "PROVINCE" ||
                user?.userLevel == "NATIONAL"
              ) {
                navigation.navigate("vlcd4Details", { screen: "NewVLCD4" });
              } else {
                Alert.alert(
                  "Insuffficient rights",
                  "You are not allowed to perform this action."
                );
              }
            }}
          >
            <View style={styles.labelContainer}>
              {/* <Text style={{ color: "white" }}>VL/CD4</Text> */}
              <FIcon name="virus" style={styles.actionButtonIcon} />
            </View>
          </ActionButton.Item>

          <ActionButton.Item
            buttonColor={Colors.dodger}
            title="Referral Admin"
            size={60}
            onPress={() => {
              navigation.navigate("referralDetails", { screen: "NewReferral" });
            }}
          >
            <View style={styles.labelContainer}>
              {/* <Text style={{ color: "white" }}>Referral</Text> */}
              <Icon
                name="md-arrow-redo-sharp"
                style={styles.actionButtonIcon}
              />
            </View>
          </ActionButton.Item>

          <ActionButton.Item
            buttonColor={Colors.primary}
            title="Contact Admin"
            size={60}
            onPress={() =>
              navigation.navigate("contactDetails", { screen: "NewContact" })
            }
          >
            <View style={styles.labelContainer}>
              {/* <Text style={{ color: "white" }}>Contact</Text> */}
              <FIcon name="handshake" style={styles.actionButtonIcon} />
            </View>
          </ActionButton.Item>

          <ActionButton.Item
            buttonColor={Colors.danger}
            size={60}
            title="Mental Health"
            onPress={() => {
              if (patient?.age > 10) {
                navigation.navigate("mhDetails", { screen: "NewMH" });
              } else {
                Alert.alert(
                  "Minimum Age Restriction",
                  "Client below age (10 years) allowed for screening"
                );
              }
            }}
          >
            <View style={styles.labelContainer}>
              {/* <Text style={{ color: "white" }}>MHealth</Text> */}
              <FIcon name="head-side-virus" style={styles.actionButtonIcon} />
            </View>
          </ActionButton.Item>

          <ActionButton.Item
            buttonColor={Colors.bluish}
            title="TB Screening"
            size={60}
            onPress={() => {
              if (patient?.age > 10) {
                navigation.navigate("tbDetails", { screen: "NewTB" });
              } else {
                Alert.alert(
                  "Minimum Age Restriction",
                  "Client below age (10 years) allowed for screening"
                );
              }
            }}
          >
            <View style={styles.labelContainer}>
              {/* <Text style={{ color: "white" }}>TB/TPT</Text> */}
              <FIcon name="head-side-cough" style={styles.actionButtonIcon} />
            </View>
          </ActionButton.Item>
        </ActionButton>

        <ScrollView style={styles.scroll}>
          <View style={styles.container}>
            <View style={styles.rowData}>
              <AppText style={styles.textLine}>{"Full Name"}</AppText>
              <AppText
                style={styles.textLine}
              >{`${patient?.firstName} ${patient?.lastName}`}</AppText>
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.rowData}>
              <AppText style={styles.textLine}>{"Date Of Birth"}</AppText>
              <AppText style={styles.textLine}>{patient?.dateOfBirth}</AppText>
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.rowData}>
              <AppText style={styles.textLine}>{"GENDER"}</AppText>
              <AppText style={styles.textLine}>{patient?.gender}</AppText>
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.rowData}>
              <AppText style={styles.textLine}>{"Current Age"}</AppText>
              <AppText style={styles.textLine}>{patient?.age + "yrs"}</AppText>
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.rowData}>
              <AppText style={styles.textLine}>{"Phone Number"}</AppText>
              <AppText style={styles.textLine}>{patient?.mobileNumber}</AppText>
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.rowData}>
              <AppText style={styles.textLine}>{"Care Level"}</AppText>
              <AppText style={styles.textLine}>
                {patient?.enhancedStatus === 0 ? "Standard" : "Enhanced"}
              </AppText>
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.rowData}>
              <AppText style={styles.textLine}>{"Facility"}</AppText>
              <AppText style={styles.textLine}>{patient?.facility}</AppText>
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.rowData}>
              <AppText style={styles.textLine}>{"District"}</AppText>
              <AppText style={styles.textLine}>{patient?.district}</AppText>
            </View>
          </View>
        </ScrollView>
      </AppRotateScreenCenter>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: {
    zIndex: -10,
    width: "100%",
    height: "100%",
  },
  rowData: {
    width: "100%",
    flexDirection: "row",
    borderBottomColor: Colors.medium,
    borderBottomWidth: 0.5,
    borderBottomEndRadius: 3,
  },
  textLine: {
    width: "50%",
    alignItems: "flex-start",
    color: Colors.secondary,
    borderRightColor: Colors.medium,
    borderRightWidth: 0.5,
  },
  container: {
    borderRightColor: Colors.medium,
    borderRightWidth: 0.5,
    paddingVertical: 5,
    width: "100%",
  },
  mainContainer: {
    width: "100%",
    height: "100%",
  },
  linkContainer: {
    justifyContent: "flex-end",
    flex: 1,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "40%",
    alignItems: "center",
    backgroundColor: Colors.light,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
  },
  floatContainer: {
    width: "100%",
    height: "100%",
  },
  actionButtonIcon: {
    fontSize: 25,
    height: 22,
    color: "white",
    zIndex: -1,
  },
  ActionButton: {
    zIndex: -1,
    fontSize: 25,
  },
  actionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
    backgroundColor: "transparent",
  },
  actionButtonIcon: {
    fontSize: 28,
    // height: 22,
    color: "white",
  },
  labelContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default PatientDetailsScreen;
