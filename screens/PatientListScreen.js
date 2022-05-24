import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  Easing,
  BackHandler,
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
import AppRotateScreenCenter from "../components/animatedContainers/AppRotateScreenCenter";
import { IconButton } from "react-native-paper";
import AppZoomOutScreenCenter from "../components/animatedContainers/AppZoomOutScreenCenter";
import AppZoomOutViewScreen from "../components/animatedContainers/AppZoomOutViewScreen";

const PatientListScreen = ({ route, navigation }) => {
  const patients = route.params.patients;
  const [filteredPatients, setFilteredPatients] = useState(patients);
  const [user, setUser] = useState(null);
  const toast = useToast();

  useEffect(async () => {
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
        {/* {user?.userLevel === "DISTRICT" && ( */}
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
          title="Refresh List"
          textStyle={styles.actionText}
          style={{ backgroundColor: "transparent" }}
          onPress={() => {
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
                  Alert.alert("OPERATION ERROR", error.response.data);
                }
              }}
            />
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      />
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
});

export default PatientListScreen;
