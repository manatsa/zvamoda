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
import AppNetworkInfo from "../../utils/AppNetworkInfo";
import ClientListItem from "./ClientListItem";
import SynchronizeClients from "../../storage/SynchronizeClients";
import AppFlipYScreenCenter from "../../components/animatedContainers/AppFlipYScreenCenter";
import { Col, Grid, Row } from "react-native-easy-grid";
import Gender from "../../models/Gender";
import ClientType from "../../models/ClientType";

export default function ClientListScreen() {
  const [clients, setClients] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [item, setItem] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const toast = useToast();

  const getData = async () => {
    const clientsString = await AsyncStorage.getItem(
      StorageKeys.newPatientsKey
    );

    const facilitiesString = await AsyncStorage.getItem(
      StorageKeys.facilitiesKey
    );

    setFacilities(JSON.parse(facilitiesString) || []);

    if (clientsString) {
      const conts = JSON.parse(clientsString);
      setClients(conts);
    }
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
            title="Synchronize Clients"
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
                  const code = await SynchronizeClients(token);
                  if (!code) {
                  } else if (code === 200) {
                    Alert.alert("Clients synchronization was successful!");
                  } else if (code < 0) {
                    Alert.alert("No clients to synchronize!");
                  } else {
                    Alert.alert("Clients synchronization failed!");
                  }
                  await getData();
                  setIsSyncing(false);
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
            title="Refresh Client List"
            textStyle={styles.actionText}
            textContainerStyle={styles.textContainer}
            onPress={async () => {
              const cls = await AsyncStorage.getItem(
                StorageKeys.newPatientsKey
              );
              setClients(JSON.parse(cls));
              toast.show("Client List refreshed successsfully!", {
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
            title="Clear Client List"
            textStyle={styles.actionText}
            textContainerStyle={styles.textContainer}
            onPress={async () => {
              await AsyncStorage.removeItem(StorageKeys.newPatientsKey);
              const cls = await AsyncStorage.getItem(
                StorageKeys.newPatientsKey
              );
              setClients(JSON.parse(cls));
              Alert.alert(
                "Clients Clearing",
                "Client List cleared successfully!"
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
                      <Text>{":: " + (item?.firstName || "")}</Text>
                    </Col>
                  </Row>
                  <Row style={[styles.modalRow]}>
                    <Col>
                      <AppText>{"Last Name"}</AppText>
                    </Col>
                    <Col>
                      <Text>{":: " + (item?.lastName || "")}</Text>
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
                      <AppText>{"Gender"}</AppText>
                    </Col>
                    <Col>
                      <Text>
                        {":: " + (Gender[String(item?.gender)]?.label || "")}
                      </Text>
                    </Col>
                  </Row>
                  <Row style={styles.modalRow}>
                    <Col>
                      <AppText>{"Date Of Birth"}</AppText>
                    </Col>
                    <Col>
                      <Text>
                        {":: " +
                          (item?.dateOfBirth
                            ? new Date(item?.dateOfBirth)
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
                      <AppText>{"Primary Clinic"}</AppText>
                    </Col>
                    <Col>
                      <Text>
                        {":: " +
                          (facilities.find((f) => f?.id === item?.primaryClinic)
                            ?.name || "")}
                      </Text>
                    </Col>
                  </Row>
                  <Row style={styles.modalRow}>
                    <Col>
                      <AppText>{"Client Type"}</AppText>
                    </Col>
                    <Col>
                      <Text>
                        {":: " +
                          (ClientType[String(item?.clientType)]?.label || "")}
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
                      <AppText>{"Started Treatment"}</AppText>
                    </Col>
                    <Col>
                      <Text>
                        {":: " +
                          (item?.dateStartedTreatment
                            ? new Date(item?.dateStartedTreatment)
                                ?.toISOString()
                                .slice(0, 10)
                            : "")}
                      </Text>
                    </Col>
                  </Row>
                  <Row style={styles.modalRow}>
                    <Col>
                      <AppText>{"Date Joined Zvandiri"}</AppText>
                    </Col>
                    <Col>
                      <Text>
                        {":: " +
                          (item?.dateJoined
                            ? new Date(item?.dateJoined)
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
                      <AppText>{"Date Tested"}</AppText>
                    </Col>
                    <Col>
                      <Text>
                        {":: " +
                          (item?.dateTested
                            ? new Date(item?.dateTested)
                                ?.toISOString()
                                .slice(0, 10)
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
                            `Delete ${item?.firstName} ${item?.lastName}`,
                            "Are you sure you want to delete this client?",
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
                                    const newClients = clients.filter(
                                      (p) =>
                                        p.firstName !== item?.firstName &&
                                        p.lastName !== item?.lastName &&
                                        p.dateOfBirth != item?.dateOfBirth &&
                                        p.primaryClinic !== item?.primaryClinic
                                    );
                                    await AsyncStorage.setItem(
                                      StorageKeys.newPatientsKey,
                                      JSON.stringify(newClients)
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
                        onPress={() => setShowModal(false)}
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
          data={clients}
          style={{ zIndex: -1 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <TouchableHighlight
                onPress={() => {
                  setItem(item);
                  setShowModal(true);
                  setIndex(index);
                }}
              >
                <View style={styles.listItemContainer}>
                  <ClientListItem client={item} index={index} />
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
    minHeight: "90%",
    maxHeight: "95%",
    width: "95%",
    justifyContent: "center",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    zIndex: 1000,
  },
  modalRow: {
    paddingVertical: 5,
    // borderBottomWidth: 0.2,
  },
});
