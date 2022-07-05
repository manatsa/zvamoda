import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  Easing,
  ActivityIndicator,
  Text,
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
import AppNetworkInfo from "../utils/AppNetworkInfo";
import { SwipeListView } from "react-native-swipe-list-view";
import {
  Divider,
  IconButton,
  Modal,
  Portal,
  Provider,
} from "react-native-paper";
import * as yup from "yup";
import { AppForm, AppSubmitButton } from "../components/form";
import AppDatePicker from "../components/wrappers/AppDatePicker";
import AppFlipYScrollViewScreen from "../components/animatedContainers/AppFlipYScrollViewScreen";
import AppFormLoadingSubmit from "../components/form/AppFormLoadingSubmit";

const statsInitValues = {
  start: new Date(),
  end: new Date(),
};

const statsValidationSchema = yup.object().shape({
  start: yup
    .date()
    .typeError(
      "Invalid date. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each"
    )
    .required("Start date cannot be empty!"),
  end: yup
    .date()
    .typeError(
      "Invalid date. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each"
    )
    .required("End date cannot be empty!"),
});

const PatientListScreen = ({ route, navigation }) => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState(patients);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isFeching, setIsFetching] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [shwoDates, setShowDates] = useState(false);
  const [item, setItem] = useState(null);
  const [data, setData] = useState([]);
  const [cohort, setCohort] = useState(route?.params?.patients?.length);
  const toast = useToast();

  useEffect(async () => {
    const patientString = await AsyncStorage.getItem(
      StorageKeys.patientListKey
    );
    const paties = JSON.parse(patientString);
    // console.log(paties);
    setPatients(paties);
    setFilteredPatients(paties);
    const token = await AsyncStorage.getItem(StorageKeys.tokenKey);
    setToken(token);
    const u = await AsyncStorage.getItem(StorageKeys.currentUserKey);
    if (u) setUser(JSON.parse(u));
  }, [cohort]);

  const onRefresh = async () => {
    const connectivity = await AppNetworkInfo();
    const { isConnected, isInternetReachable } = connectivity;
    if (isConnected && !isInternetReachable) {
      toast.show(
        "You're  connected but internet accessibility cannot be guaranteed!.",
        {
          type: "warning",
          duration: 5000,
          animationDuration: 1000,
          animationType: "zoom-in",
          placement: "bottom",
        }
      );
    }

    if (isConnected) {
      setIsSyncing(true);
      const response = await GetFromApi(
        token,
        "/patient/refresh-patients"
      ).catch((error) => {
        Alert.alert("SYNC ERROR", error.toJSON().message);
      });
      if (response?.status === 200) {
        await AsyncStorage.setItem(
          StorageKeys.patientListKey,
          JSON.stringify(response?.data)
        );
        setCohort(response?.data?.length);

        toast.show("Client list fetched successfully!", {
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
    } else {
      Alert.alert(
        "Network Status",
        "You're not connected and cannot access online activities!.\n Please connect to internet and try agin."
      );
    }
  };

  const onSubmit = async (values) => {
    setIsFetching(true);
    const { start, end } = values;
    const startFinal = new Date(String(start))?.toISOString()?.slice(0, 10);
    const endFinal = new Date(String(end))?.toISOString()?.slice(0, 10);

    try {
      if (item && item?.id && item?.id !== "") {
        const segment = `/patient/get-patient-stats/?patient=${item?.id}&start=${startFinal}&end=${endFinal}`;
        const personData = await GetFromApi(token, segment).catch((error) => {
          Alert.alert("ERROR FECTHING DATA", error.toJSON().message);
        });

        //console.log("DATA :: ", personData?.data?.contacts);
        setShowDates(false);
        setIsFetching(false);
        navigation.navigate("patientLineItems", {
          data: personData?.data,
          patient: item,
        });
      }
    } finally {
      setIsFetching(false);
    }
  };

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
            setCohort(patientList?.length);
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

      <SwipeListView
        style={{ minWidth: "90%", zIndex: -10 }}
        data={filteredPatients || patients}
        onRefresh={onRefresh}
        refreshing={isSyncing}
        bounces={true}
        initialRightActionState={true}
        renderItem={({ item, index }) => {
          return (
            <PatientListItem
              item={item}
              index={index}
              onPress={async () => {
                try {
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
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.rowBack}>
            <IconButton
              //icon={"eye"}
              icon={"menu"}
              size={40}
              style={{ backgroundColor: Colors.smokygrey }}
              color={Colors.secondary}
              onPress={() => {
                setItem(data.item);
                setShowDates(true);
              }}
            />
            <IconButton
              //icon={"eye"}
              icon={"menu"}
              size={40}
              style={{ backgroundColor: Colors.smokygrey }}
              color={Colors.secondary}
              onPress={() => {
                setItem(data.item);
                setShowDates(true);
              }}
            />
          </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
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

      <Provider>
        <Portal>
          <Modal
            visible={shwoDates}
            dismissable={true}
            contentContainerStyle={[
              styles.modalContainer,
              {
                borderWidth: 5,
                borderColor: Colors.secondary,
                elevation: 30,
                flex: 1,
                height: 500,
                padding: 20,
                backgroundColor: Colors.smokygrey,
              },
            ]}
            onDismiss={() => setShowDates(false)}
          >
            <AppFlipYScrollViewScreen>
              <AppText
                style={{
                  color: Colors.bluish,
                  textDecorationLine: "underline",
                }}
              >
                Dates For Line Items
              </AppText>
              <Divider />
              <AppForm
                initialValues={statsInitValues}
                validationSchema={statsValidationSchema}
                onSubmit={onSubmit}
              >
                <AppDatePicker name={"start"} label={"Start Date"} />
                <AppDatePicker name={"end"} label={"End Date"} />
                <AppFormLoadingSubmit
                  title={"Fetch Line Items"}
                  isLoading={isFeching}
                  color={Colors.greenish}
                  loadingLabel={"Fetching data... wait"}
                />
              </AppForm>
            </AppFlipYScrollViewScreen>
          </Modal>
        </Portal>
      </Provider>
    </AppZoomOutViewScreen>
  );
};
// );

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
  rowBack: {
    width: "100%",
    backgroundColor: "#DDD",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    zIndex: -100,
  },
});

export default PatientListScreen;
