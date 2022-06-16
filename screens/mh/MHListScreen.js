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
import MHListItem from "./MHListItem";
import SynchronizeMHScreening from "../../storage/SynchronizeMHScreening";
import AppFlipYScreenCenter from "../../components/animatedContainers/AppFlipYScreenCenter";
import YesNo from "../../models/YesNo";
import { Col, Grid, Row } from "react-native-easy-grid";
import IdentifiedRisks from "../../models/IdentifiedRisks";
import Supports from "../../models/Supports";

export default function ReferralListScreen() {
  const [patient, setPatient] = useState(null);
  const [mhs, setMHs] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const toast = useToast();
  const [visible, setVisible] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const [item, setItem] = useState();

  const getData = async () => {
    const patientString = await AsyncStorage.getItem(StorageKeys.patient);
    let p = JSON.parse(patientString);
    setPatient(p);
    const mhString = await AsyncStorage.getItem(StorageKeys.mhScreeningKey);
    let mhs = [];
    if (mhString) {
      const mhObject = JSON.parse(mhString);
      const r = mhObject.filter((rf) => {
        return rf.patient === p.id;
      });
      mhs = r;
    }
    setMHs(mhs);

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
            title="Synchronize MH Screenings"
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

                  const code = await SynchronizeMHScreening(token);
                  if (!code) {
                  } else if (code === 200) {
                    Alert.alert(
                      "MH Screenings synchronization was successful!"
                    );
                  } else if (code < 0) {
                    Alert.alert("No referrals to synchronize!");
                  } else {
                    Alert.alert("MH Screenings synchronization failed!");
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
            title="Refresh MH List"
            textStyle={styles.actionText}
            textContainerStyle={styles.textContainer}
            onPress={async () => {
              const mhs = await AsyncStorage.getItem(
                StorageKeys.mhScreeningKey
              );
              setMHs(JSON.parse(mhs));
              toast.show("MH Screenings List refreshed successfully!", {
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
            title="Clear MH Screenings List"
            textStyle={styles.actionText}
            textContainerStyle={styles.textContainer}
            onPress={async () => {
              await AsyncStorage.removeItem(StorageKeys.mhScreeningKey);
              const mhs = await AsyncStorage.getItem(
                StorageKeys.mhScreeningKey
              );
              setMHs(JSON.parse(mhs));
              Alert.alert(
                "MH Screenings Clearing",
                "MH Screenings List cleared successfully!"
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
                      <AppText>{"Screening Date"}</AppText>
                    </Col>
                    <Col>
                      <Text>
                        {":: " +
                          (item?.dateScreened
                            ? new Date(item?.dateScreened)
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
                      <AppText>{"At Risk"}</AppText>
                    </Col>
                    <Col>
                      <Text>{":: " + YesNo[String(item?.risk)]?.label}</Text>
                    </Col>
                  </Row>
                  <Row style={styles.modalRow}>
                    <Col>
                      <AppText>{"Risks"}</AppText>
                    </Col>
                    <Col>
                      <Text>
                        {":: " +
                          (item?.identifiedRisks?.map(
                            (r) => IdentifiedRisks[String(r)]?.label
                          ) || "")}
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
                      <AppText>{"Support"}</AppText>
                    </Col>
                    <Col>
                      <Text>
                        {":: " + (YesNo[String(item?.support)]?.label || "")}
                      </Text>
                    </Col>
                  </Row>
                  <Row style={styles.modalRow}>
                    <Col>
                      <AppText>{"Support From"}</AppText>
                    </Col>
                    <Col>
                      <Text>
                        {":: " +
                          (item?.supports?.map(
                            (p) =>
                              Supports.find((s) => {
                                return s.value === p;
                              })?.label
                          ) || "")}
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
                      <AppText>{"Referred"}</AppText>
                    </Col>
                    <Col>
                      <Text>
                        {":: " + (YesNo[String(item?.referral)]?.label || "")}
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
                            `Delete ${patient?.firstName} ${patient?.lastName}'s MH Item`,
                            "Are you sure you want to delete this MH item?",
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
                                    const newMHs = mhs.filter(
                                      (m) =>
                                        JSON.stringify(m) !==
                                        JSON.stringify(item)
                                    );
                                    console.log(newMHs);
                                    await AsyncStorage.setItem(
                                      StorageKeys.mhScreeningKey,
                                      JSON.stringify(newMHs)
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
          data={mhs}
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
                  <MHListItem mhScreening={item} index={index} />
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
