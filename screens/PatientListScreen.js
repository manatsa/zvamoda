import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  Easing,
  ActivityIndicator,
} from "react-native";
import PatientListItem from "../components/PatientListItem";
import AppTextInput from "../components/wrappers/AppTextInput";
import Styles from "../config/Styles";
import Colors from "../config/Colors";
import AppText from "../components/wrappers/AppText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKeys from "../utils/StorageKeys";
import ActionButton from "react-native-simple-action-button";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useToast } from "react-native-toast-notifications";
import AppZoomOutViewScreen from "../components/animatedContainers/AppZoomOutViewScreen";
import GetFromApi from "../api/GetAxiosClient";

const PatientListScreen = ({ route, navigation }) => {
  const [patients, setPatients] = useState(route.params.patients);
  const [filteredPatients, setFilteredPatients] = useState(patients);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const toast = useToast();

  useEffect(async () => {
    const token = await AsyncStorage.getItem(StorageKeys.tokenKey);
    setToken(token);
    const u = await AsyncStorage.getItem(StorageKeys.currentUserKey);
    if (u) setUser(JSON.parse(u));
  }, []);

  return (
    <AppZoomOutViewScreen easing={Easing.linear} duration={600}>
      <ActionButton
        style={styles.ActionButton}
        buttonColor={Colors.secondary}
        radiua={150}
        btnOutRange={Colors.primary}
        outRangeScale={1.2}
      >
        <ActionButton.Item
          buttonColor={Colors.greenish}
          title="Sync Patient List"
          textStyle={styles.actionText}
          style={{ backgroundColor: "transparent" }}
          onPress={async () => {
            setIsSyncing(true);
            const response = await GetFromApi(
              token,
              "/patient/refresh-patients"
            ).catch((error) => {
              Alert.alert("SYNC ERROR", error.toJSON().message);
            });
            if (response?.status === 200) {
              // console.log(response?.data);
              setPatients(response?.data);
              toast.show("Client List re-synchronized successfully!", {
                type: "success",
                duration: 4500,
                animationDuration: 1000,
                animationType: "zoom-in",
                placement: "bottom",
              });
            } else {
              Alert.alert("SYNC ERROR", response?.statusText);
            }
            setIsSyncing(false);
          }}
        >
          <Icon name="refresh" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor={Colors.dodger}
          title="New Client"
          textStyle={styles.actionText}
          onPress={() => {
            if (
              user?.userLevel === "DISTRICT" ||
              user?.userLevel === "PROVINCE"
            ) {
              navigation.navigate("clientDetails", { screen: "NewClient" });
            } else {
              Alert.alert(
                "Insuffficient rights",
                "You are not allowed to perform this action."
              );
            }
          }}
        >
          <Icon name="plus" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        ){/* } */}
        <ActionButton.Item
          buttonColor={Colors.bluish}
          title="Refresh Patient List"
          textStyle={styles.actionText}
          style={{ backgroundColor: "transparent" }}
          onPress={async () => {
            const ps = await AsyncStorage.getItem(StorageKeys.patientListKey);
            const patientList = JSON.parse(ps);
            setPatients(patientList);
            toast.show("Client List refreshed successfully!", {
              type: "success",
              duration: 2500,
              animationDuration: 1000,
              animationType: "zoom-in",
              placement: "bottom",
            });
          }}
        >
          <Icon name="refresh" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>

      <View style={styles.badge}>
        <AppText
          style={{
            color: Colors.primary,
            fontSize: 12,
            backgroundColor: Colors.light,
            padding: 10,
            borderColor: Colors.danger,
            borderWidth: 0.5,
            borderRadius: 10,
            borderTopWidth: 0,
          }}
        >
          {filteredPatients
            ? filteredPatients.length + " Clients"
            : "0 Clients"}
        </AppText>
      </View>
      <View style={Styles.searchContainer}>
        <AppTextInput
          placeholder="search"
          onChangeText={(value) =>
            setFilteredPatients(
              patients?.filter(
                (p) =>
                  p.firstName.toLowerCase().includes(value.toLowerCase()) ||
                  p.lastName.toLowerCase().includes(value.toLowerCase()) ||
                  value.toLowerCase().includes(p.firstName.toLowerCase()) ||
                  value.toLowerCase().includes(p.lastName.toLowerCase())
              )
            )
          }
          icon={"search"}
        />
      </View>

      <FlatList
        style={{ minWidth: "90%", zIndex: -10 }}
        data={filteredPatients || patients}
        renderItem={({ item, index }) => {
          return (
            <PatientListItem
              item={item}
              index={index}
              onPress={async () => {
                try {
                  //console.log(item);
                  const patientString = JSON.stringify(item);
                  await AsyncStorage.setItem(
                    StorageKeys.patient,
                    patientString
                  );

                  navigation.navigate("patientDetails", { patient: item });
                } catch (error) {
                  Alert.alert("OPERATION ERROR", error?.response?.data);
                }
              }}
            />
          );
        }}
        keyExtractor={(item) =>
          item?.id?.toString() + item?.firstName + item?.dateOfBirth?.toString()
        }
      />
      {isSyncing && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator
            size={"large"}
            animating={true}
            color={Colors.greenish}
          />
          <View>
            <AppText style={styles.indicatorText}>Synchronizing...wait</AppText>
          </View>
        </View>
      )}
    </AppZoomOutViewScreen>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
  },
  searchInput: {
    flex: 3,
  },
  searchButton: {
    backgroundColor: Colors.secondary,
    flex: 1,
  },
  badge: {
    width: "100%",
    alignItems: "flex-end",
    paddingHorizontal: 15,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
    zIndex: -1,
  },
  ActionButton: {
    zIndex: 1,
  },
  actionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
    backgroundColor: "transparent",
  },
  activityIndicatorContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
});

export default PatientListScreen;
