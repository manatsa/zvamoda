import {
  Alert,
  Easing,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKeys from "../../utils/StorageKeys";
import AppText from "../../components/wrappers/AppText";
import Colors from "../../config/Colors";
import ActionButton from "react-native-simple-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import EIcon from "react-native-vector-icons/Entypo";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FIcon from "react-native-vector-icons/FontAwesome";
import {
  ActivityIndicator,
  Button,
  IconButton,
  Modal,
  Portal,
  Provider,
  Text,
} from "react-native-paper";
import { useToast } from "react-native-toast-notifications";
import SynchronizeVLCD4s from "../../storage/SynchronizeVLCD4s";
import VLCD4ListItem from "./VLCD4ListItem";
import AppNetworkInfo from "../../utils/AppNetworkInfo";
import AppFlipYScreenCenter from "../../components/animatedContainers/AppFlipYScreenCenter";
import { Col, Grid, Row } from "react-native-easy-grid";
import TestType from "../../models/TestType";
import Cd4CountResultSource from "../../models/Cd4CountResultSource";
import YesNo from "../../models/YesNo";

export default function VLCD4ListScreen() {
  const [patient, setPatient] = useState(null);
  const [vls, setVls] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const toast = useToast();
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState({});
  const [facilities, setFacilities] = useState([]);

  const getData = async () => {
    const patientString = await AsyncStorage.getItem(StorageKeys.patient);
    let p = JSON.parse(patientString);
    setPatient(p);
    const vlString = await AsyncStorage.getItem(StorageKeys.vls);
    let vl = [];
    if (vlString) {
      const vlObject = JSON.parse(vlString);
      const c = vlObject.filter((v) => {
        return v.patient === p.id;
      });
      vl = c;
    }
    setVls(vl);
    const facilitiesString = await AsyncStorage.getItem(
      StorageKeys.facilitiesKey
    );
    const fcs = JSON.parse(facilitiesString);
    setFacilities(fcs);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AppFlipYScreenCenter duration={1500} easing={Easing.bounce}>
      <View style={styles.container}>
        <ActionButton
          buttonColor={Colors.primary}
          style={styles.ActionButton}
          zIndex={100}
          renderIcon={() => (
            <EIcon color={Colors.light} name="dots-three-vertical" size={30} />
          )}
        >
          <ActionButton.Item
            buttonColor={Colors.greenish}
            title="Synchronize VL/CD4"
            textStyle={styles.actionText}
            textContainerStyle={styles.textContainer}
            onPress={async () => {
              setIsSyncing(true);
              const connectivity = await AppNetworkInfo();
              const { isConnected, isInternetReachable } = connectivity;
              if (isConnected && !isInternetReachable) {
                // Alert.alert(
                //   "Network Status",
                //   "You're  connected but internet accessibility cannot be guaranteed!."
                // );
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
                try {
                  const token = await AsyncStorage.getItem(
                    StorageKeys.tokenKey
                  );
                  const code = await SynchronizeVLCD4s(token);
                  setIsSyncing(false);
                  if (!code) {
                  } else if (code === 200) {
                    Alert.alert("VL/CD4 synchronization was successful!");
                  } else if (code < 0) {
                    Alert.alert("No VL/CD4 items to synchronize!");
                  } else {
                    Alert.alert("VL/CD4 synchronization failed!");
                  }
                  await getData();
                } finally {
                  setIsSyncing(false);
                }
              } else {
                Alert.alert(
                  "Network Status",
                  "You're not connected and cannot access online activities!.\n Please connect to internet and try agin."
                );
              }

              setIsSyncing(false);
            }}
          >
            <FIcon name="refresh" style={styles.actionButtonIcon} />
          </ActionButton.Item>

          <ActionButton.Item
            buttonColor={Colors.bluish}
            title="Refresh VL/CD4 List"
            textStyle={styles.actionText}
            textContainerStyle={styles.textContainer}
            onPress={async () => {
              const vls = await AsyncStorage.getItem(StorageKeys.vls);
              setVls(JSON.parse(vls));
              toast.show("VL/CD4 Items refreshed successfully!", {
                type: "success",
                duration: 2500,
                animationDuration: 1000,
                animationType: "zoom-in",
                placement: "bottom",
              });
            }}
          >
            <MIcon name="refresh" style={styles.actionButtonIcon} />
          </ActionButton.Item>

          <ActionButton.Item
            buttonColor={Colors.danger}
            title="Clear VL/CD4 List"
            textStyle={styles.actionText}
            textContainerStyle={styles.textContainer}
            onPress={async () => {
              await AsyncStorage.removeItem(StorageKeys.vls);
              const contacts = await AsyncStorage.getItem(StorageKeys.vls);
              setVls(JSON.parse(contacts));
              Alert.alert(
                "VL/CD4 Clearing",
                "VL/CD4 List cleared successfully!"
              );
            }}
          >
            <Icon name="close" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

        <Provider>
          <Portal>
            <Modal
              visible={showModal}
              dismissable={true}
              contentContainerStyle={[
                styles.modalContainer,
                {
                  borderWidth: 5,
                  borderColor: Colors.secondary,
                  elevation: 30,
                },
              ]}
              onDismiss={() => setShowModal(false)}
            >
              <ScrollView>
                <Grid>
                  <Row
                    style={[
                      styles.modalRow,
                      {
                        backgroundColor: Colors.smokygrey,
                      },
                    ]}
                  >
                    <Col>
                      <AppText>{"First Name"}</AppText>
                    </Col>
                    <Col>
                      <Text>{":: " + (patient?.firstName || "")}</Text>
                    </Col>
                  </Row>
                  <Row style={[styles.modalRow]}>
                    <Col>
                      <AppText>{"Last Name"}</AppText>
                    </Col>
                    <Col>
                      <Text>{":: " + (patient?.lastName || "")}</Text>
                    </Col>
                  </Row>
                  <Row
                    style={[
                      styles.modalRow,
                      {
                        backgroundColor: Colors.smokygrey,
                      },
                    ]}
                  >
                    <Col>
                      <AppText>{"Primary Clinic"}</AppText>
                    </Col>

                    <Col>
                      <Text>
                        {":: " +
                          (facilities?.find((f) => f?.id == patient?.facilityID)
                            ?.name || "")}
                      </Text>
                    </Col>
                  </Row>
                  <Row style={styles.modalRow}>
                    <Col>
                      <AppText>{"Date Taken"}</AppText>
                    </Col>
                    <Col>
                      <Text>
                        {":: " +
                          (item?.dateTaken
                            ? new Date(item?.dateTaken)
                                ?.toISOString()
                                .slice(0, 10)
                            : "")}
                      </Text>
                    </Col>
                  </Row>
                  <Row
                    style={[
                      styles.modalRow,
                      {
                        backgroundColor: Colors.smokygrey,
                      },
                    ]}
                  >
                    <Col>
                      <AppText>{"Test Type"}</AppText>
                    </Col>
                    <Col>
                      <Text>
                        {":: " +
                          (TestType[String(item?.testType)]?.label || "")}
                      </Text>
                    </Col>
                  </Row>
                  <Row style={styles.modalRow}>
                    <Col>
                      <AppText>{"Source"}</AppText>
                    </Col>
                    <Col>
                      <Text>
                        {":: " +
                          (Cd4CountResultSource[String(item?.source)]?.label ||
                            "")}
                      </Text>
                    </Col>
                  </Row>
                  <Row
                    style={[
                      styles.modalRow,
                      {
                        backgroundColor: Colors.smokygrey,
                      },
                    ]}
                  >
                    <Col>
                      <AppText>{"Have Result"}</AppText>
                    </Col>
                    <Col>
                      <Text>
                        {":: " + (YesNo[String(item?.haveResult)]?.label || "")}
                      </Text>
                    </Col>
                  </Row>
                  <Row style={styles.modalRow}>
                    <Col>
                      <AppText>{"Next Test Date"}</AppText>
                    </Col>
                    <Col>
                      <Text>
                        {":: " +
                          (item?.nextTestDate
                            ? new Date(item?.nextTestDate)
                                ?.toISOString()
                                .slice(0, 10)
                            : "")}
                      </Text>
                    </Col>
                  </Row>
                  <Row
                    style={[
                      styles.modalRow,
                      {
                        backgroundColor: Colors.smokygrey,
                      },
                    ]}
                  >
                    <Col>
                      <AppText>{"Result"}</AppText>
                    </Col>
                    <Col>
                      <Text>
                        {":: " +
                          (item?.result
                            ? item?.result
                            : item?.tnd
                            ? item?.tnd
                            : "")}
                      </Text>
                    </Col>
                  </Row>

                  <Row style={[styles.modalRow, { paddingTop: 20 }]}>
                    <Col>
                      <IconButton
                        icon={"delete"}
                        animated={true}
                        //background={Colors.danger}
                        color={Colors.danger}
                        size={20}
                        style={{
                          borderColor: Colors.danger,
                          borderWidth: 1.5,
                        }}
                        onPress={() => {
                          Alert.alert(
                            `Delete ${patient?.firstName} ${patient?.lastName}'s VL/CD4 Item`,
                            "Are you sure you want to delete this VL/CD4 item?",
                            [
                              {
                                text: "No",
                                style: "cancel",
                                onPress: () => null,
                              },
                              {
                                text: "Delete",
                                style: "default",
                                onPress: async () => {
                                  if (item) {
                                    const newVLs = vls.filter(
                                      (v) =>
                                        JSON.stringify(v) !==
                                        JSON.stringify(item)
                                    );
                                    console.log(newVLs);
                                    await AsyncStorage.setItem(
                                      StorageKeys.vls,
                                      JSON.stringify(newVLs)
                                    );
                                    Alert.alert(
                                      "DELETE ACTION",
                                      "Item deleted Successfully!"
                                    );
                                    setShowModal(false);
                                  }
                                },
                              },
                            ]
                          );
                        }}
                      />
                    </Col>
                    <Col>
                      <Button
                        color={Colors.primary}
                        icon={"close"}
                        mode="outlined"
                        style={{ maxWidth: 120, elevation: 20 }}
                        onPress={() => {
                          setShowModal(false);
                        }}
                      >
                        Close
                      </Button>
                    </Col>
                  </Row>
                </Grid>
              </ScrollView>
            </Modal>
          </Portal>
        </Provider>

        <FlatList
          data={vls}
          style={{ zIndex: -1 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <TouchableHighlight
                onPress={() => {
                  setShowModal(true);
                  setItem(item);
                }}
              >
                <View style={styles.listItemContainer}>
                  <VLCD4ListItem vl={item} patient={patient} index={index} />
                </View>
              </TouchableHighlight>
            );
          }}
        />

        {isSyncing && (
          <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator
              size={"large"}
              animating={true}
              color={Colors.purple}
            />
            <View>
              <AppText style={styles.indicatorText}>
                Synchronizing...wait
              </AppText>
            </View>
          </View>
        )}
      </View>
    </AppFlipYScreenCenter>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "98%",
    height: "100%",
    alignItems: "stretch",
    justifyContent: "flex-start",
    // backgroundColor: Colors.bluish,
  },
  listItemContainer: {
    width: "100%",
    backgroundColor: Colors.light,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginVertical: 10,
    color: Colors.secondary,
    justifyContent: "flex-start",
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
    zIndex: -1,
  },
  ActionButton: {
    zIndex: 10,
  },
  textContainer: {
    height: 25,
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
  indicatorText: {
    color: Colors.primary,
  },
  modalContainer: {
    backgroundColor: Colors.light,
    zIndex: 10,
    minHeight: "20%",
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
  },
});
