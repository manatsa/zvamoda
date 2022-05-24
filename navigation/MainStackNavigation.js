import React, { useEffect, useState } from "react";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginComponent from "../components/LoginComponent";
import PatientList from "../screens/PatientListScreen";
import Colors from "../config/Colors";
import PatientDetailsTabNavigation from "./PatientDetailsTabNavigation";
import ContactDetailsTabNavigation from "./ContactDetailsTabNavigation";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import VLCD4DetailsTabNavigation from "./VLCD4DetailsTabNavigation";
import {
  ActivityIndicator,
  Dialog,
  Divider,
  HelperText,
  IconButton,
  List,
  Portal,
  Text,
} from "react-native-paper";
import AppText from "../components/wrappers/AppText";
import FIcon from "react-native-vector-icons/FontAwesome5";
import FEcon from "react-native-vector-icons/Feather";
import SummaryIndicators from "../screens/summary/SummaryIndicators";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKeys from "../utils/StorageKeys";
import ReferralDetailsTabNavigation from "./ReferralDetailsTabNavigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SynchronizeEntries from "../storage/SynchronizeEntries";
import AppNetworkInfo from "../utils/AppNetworkInfo";
import ClientDetailsTabNavigation from "./ClientDetailsTabNavigation";
import MHDetailsTabNavigation from "./MHDetailsTabNavigation";
import TBDetailsTabNavigation from "./TBDetailsTabNavigation";
import NewMessage from "../screens/chats/NewMessage";
import NewBugReport from "../screens/chats/NewBugReport";
import * as RootNavigation from "./RootNavigation";
import NewFeatureRequest from "../screens/chats/NewFeatureRequest";
import FacilityManagement from "../screens/management/FacilityManagement";

const Stack = createNativeStackNavigator();

function MainStackNavigation() {
  const [show, setShow] = useState(false);
  const [syncText, setSyncText] = useState(" Sync in progress...");
  const [visible, setVisible] = useState(false);
  const [showMgt, setShowMgt] = useState(false);
  const [user, setUser] = useState(null);
  const [facilities, setFacilities] = useState([]);

  useEffect(async () => {
    const uFacility = await AsyncStorage.getItem(StorageKeys.facilitiesKey);
    setFacilities(JSON.parse(uFacility));
  });

  return (
    <>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => setVisible(false)}
          style={styles.dialog}
        >
          <Dialog.Content>
            <Text style={styles.dialogHeader}>Zvamoda Mobile App v.1.0.0</Text>
            <List.Item
              onPress={() => {
                setVisible(false);
                RootNavigation.navigate("message");
              }}
              onLongPress={() => {}}
              title="Send A Message"
              titleStyle={styles.title}
              description="Click to send a message"
              left={(props) => (
                <List.Icon {...props} icon="chat-plus" color={Colors.primary} />
              )}
            />
            <List.Item
              titleStyle={styles.title}
              onPress={() => {
                setVisible(false);
                RootNavigation.navigate("bugreport");
              }}
              title="Report a Bug "
              description="Click to report malfunctioning."
              left={(props) => (
                <List.Icon {...props} icon="bug" color={Colors.primary} />
              )}
            />
            <List.Item
              onPress={() => {
                setVisible(false);
                RootNavigation.navigate("featureRequest");
              }}
              title="Request a feature"
              titleStyle={styles.title}
              description="Click to request a feature"
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="table-plus"
                  color={Colors.primary}
                />
              )}
            />
            <Divider style={styles.divider} />
            <Divider />
            <List.Item
              onPress={() => {
                Linking.openURL("mailto:manatsachinyeruse@gmail.com");
              }}
              title="Contact Developer"
              titleStyle={styles.developerTitle}
              description="Send email to the developer"
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="message-plus"
                  color={Colors.bluish}
                />
              )}
            />
            <HelperText style={styles.releaseDetails}>
              Release Date: 01 May 2022
            </HelperText>
            <HelperText
              style={styles.copyright}
            >{`\u00A9 Africaid 2022`}</HelperText>
          </Dialog.Content>
        </Dialog>
        <Dialog
          visible={showMgt}
          onDismiss={() => setShowMgt(false)}
          style={styles.dialog}
        >
          <Dialog.Content>
            <Text style={styles.dialogHeader}>Management Section</Text>
            <List.Item
              onPress={() => {
                setShowMgt(false);
                RootNavigation.navigate("facilityManagement", {
                  facility: "",
                  title: "All Facilities",
                });
              }}
              title={"All facilities"}
              titleStyle={styles.title}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon="hospital-building"
                  color={Colors.primary}
                />
              )}
            />
            <Divider style={{}} />
            <ScrollView>
              {facilities?.map((f) => {
                return (
                  <List.Item
                    onPress={() => {
                      setShowMgt(false);
                      RootNavigation.navigate("facilityManagement", {
                        facility: f.id,
                        title: f?.name,
                      });
                    }}
                    key={f.id}
                    onLongPress={() => {}}
                    title={f.name}
                    titleStyle={styles.title}
                    left={(props) => (
                      <List.Icon
                        {...props}
                        icon="hospital-building"
                        color={Colors.primary}
                      />
                    )}
                  />
                );
              })}
            </ScrollView>
          </Dialog.Content>
        </Dialog>
      </Portal>

      <Stack.Navigator
        initialRouteName="welcome"
        initialRouteParams={{ transition: "fade" }}
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: Colors.secondary,
            fontWeight: "600",
            zIndex: -1,
          },
          headerTintColor: Colors.light,
          headerBackVisible: true,
          headerShadowVisible: true,
          animation: "slide_from_right",
          presentation: "modal",
          animationTypeForReplace: "push",
          headerRight: () => {
            return (
              <View style={styles.headerButtonContainer}>
                <View style={styles.iconContainer}>
                  <FIcon
                    onPress={async () => {
                      const user = await AsyncStorage.getItem(
                        StorageKeys.currentUserKey
                      );
                      if (user) {
                        navigation.navigate("summary");
                      } else {
                        Alert.alert("Login Status", "Please login first!");
                      }
                    }}
                    onLongPress={async () => {
                      const user = JSON.parse(
                        await AsyncStorage.getItem(StorageKeys.currentUserKey)
                      );

                      if (user?.userLevel === "DISTRICT") {
                        setShowMgt(true);
                      } else {
                        console.log(
                          "You are not allowed to long-press for mgt info."
                        );
                      }
                    }}
                    color={Colors.light}
                    name={"bars"}
                    size={28}
                  />
                  <Text style={styles.underText}>Summary</Text>
                </View>
                <View style={styles.iconContainer}>
                  <FIcon
                    onPress={async () => {
                      setShow(true);
                      const connectivity = await AppNetworkInfo();
                      const { isConnected, isInternetReachable } = connectivity;
                      if (isConnected && !isInternetReachable) {
                        Alert.alert(
                          "Network Status",
                          "You're  connected but internet accessibility cannot be guaranteed!."
                        );
                      } else if (isConnected && isInternetReachable) {
                        try {
                          const user = await AsyncStorage.getItem(
                            StorageKeys.currentUserKey
                          );
                          if (user) {
                            const code = await SynchronizeEntries(setSyncText);
                            if (code === 200) {
                              Alert.alert(
                                "Synchronization Status",
                                "Global Synchronization was successful!"
                              );
                            } else {
                              Alert.alert(
                                "Synchronization Status",
                                "Global Synchronization failed! \n Check the summary to see what is yet to be synchronized."
                              );
                            }
                          } else {
                            Alert.alert("Login Status", "Please login first!");
                          }
                        } finally {
                          setShow(false);
                        }
                      } else {
                        Alert.alert(
                          "Network Status",
                          "You're not connected and cannot access online activities!.\n Please connect to internet and try agin."
                        );
                      }
                      setShow(false);
                    }}
                    color={Colors.greenish}
                    name={"sync"}
                    size={28}
                  />
                  <Text style={styles.underText}>Sync</Text>
                </View>
                <View style={styles.iconContainer}>
                  <TouchableOpacity
                    onPress={async () => {
                      const user = await AsyncStorage.getItem(
                        StorageKeys.currentUserKey
                      );
                      if (user) {
                        setVisible(true);
                      } else {
                        Alert.alert("Login Status", "Please login first!");
                      }
                    }}
                  >
                    <FEcon
                      name="more-vertical"
                      size={30}
                      color={Colors.light}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          },
        })}
      >
        <Stack.Group screenOptions={{ animation: "flip" }}>
          <Stack.Screen
            name="welcome"
            component={WelcomeScreen}
            options={{
              title: "Zvamoda",
            }}
          />

          <Stack.Screen name="login" component={LoginComponent} />
          <Stack.Screen
            name="patients"
            component={PatientList}
            options={({ navigation }) => ({
              title: "Client List ",
              headerBackVisible: false,
              headerLeft: ({ size }) => (
                <IconButton
                  icon={"arrow-left-thick"}
                  size={size}
                  color={"white"}
                  onPress={() => {
                    navigation.navigate("welcome");
                  }}
                />
              ),
            })}
          />
          <Stack.Screen
            name="patientDetails"
            component={PatientDetailsTabNavigation}
            options={({ route }) => ({
              title:
                "Dash: " +
                route.params.patient.lastName +
                " " +
                route.params.patient.firstName,
              animation: "slide_from_right",
            })}
          />
          <Stack.Screen
            name="contactDetails"
            component={ContactDetailsTabNavigation}
            options={({ route }) => ({
              title: "New Contact",
              animation: "slide_from_right",
            })}
          />
          <Stack.Screen
            name="mhDetails"
            component={MHDetailsTabNavigation}
            options={({ route }) => ({
              title: "New Mental Health Screening",
              animation: "slide_from_right",
            })}
          />
          <Stack.Screen
            name="tbDetails"
            component={TBDetailsTabNavigation}
            options={({ route }) => ({
              title: "New TB Screening",
              animation: "slide_from_bottom",
            })}
          />
          <Stack.Screen
            name="referralDetails"
            component={ReferralDetailsTabNavigation}
            options={({ route }) => ({
              title: "New Referral",
              animation: "slide_from_bottom",
            })}
          />
          <Stack.Screen
            name="vlcd4Details"
            component={VLCD4DetailsTabNavigation}
            options={({ route }) => ({
              title: "New VL/CD4",
              animation: "slide_from_right",
            })}
          />
          <Stack.Screen
            name="clientDetails"
            component={ClientDetailsTabNavigation}
            options={({ route }) => ({
              title: "New Client",
              animation: "slide_from_left",
            })}
          />
        </Stack.Group>
        <Stack.Group
          screenOptions={{ presentation: "modal", animation: "flip" }}
        >
          <Stack.Screen
            name="summary"
            component={SummaryIndicators}
            options={{
              title: "Indicator Summary",
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="message"
            component={NewMessage}
            options={{
              title: "Send Feeback",
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="bugreport"
            component={NewBugReport}
            options={{
              title: "New Bug Report",
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="featureRequest"
            component={NewFeatureRequest}
            options={{
              title: "New Feature Request",
              animation: "slide_from_bottom",
            }}
          />
        </Stack.Group>
        <Stack.Group>
          <Stack.Screen
            name="facilityManagement"
            component={FacilityManagement}
            options={({ route }) => ({
              title: route?.params?.title,
              animation: "slide_from_bottom",
            })}
          />
        </Stack.Group>
      </Stack.Navigator>

      {show && (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size={"large"} color={Colors.greenish} />
          <AppText style={{ color: Colors.secondary }}>{syncText}</AppText>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  actions: { fontSize: 16, fontWeight: "bold" },
  fab: {
    backgroundColor: Colors.primary,
  },
  actionButtonIcon: {
    fontSize: 25,
    height: 22,
    color: "white",
    zIndex: -1,
  },
  activityIndicator: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
  },
  headerButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  iconContainer: {
    paddingHorizontal: 12,
    alignItems: "center",
  },
  underText: {
    color: Colors.light,
    fontSize: 10,
  },
  modalContainer: {
    backgroundColor: Colors.light,
    zIndex: 10,
    minHeight: "20%",
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
  },
  dialogHeader: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.primary,
  },
  dialog: {
    backgroundColor: Colors.light,
    borderRadius: 20,
    borderWidth: 10,
    borderColor: Colors.light,
    color: Colors.primary,
  },
  title: {
    color: Colors.secondary,
    fontSize: 18,
  },
  developerTitle: {
    color: Colors.dodger,
    fontSize: 16,
  },
  divider: {
    borderColor: Colors.bluish,
    borderWidth: 1,
  },
  releaseDetails: {
    width: "100%",
    color: Colors.bluish,
    fontWeight: "600",
    alignItems: "center",
    justifyContent: "center",
  },
  copyright: {
    color: Colors.primary,
    fontWeight: "600",
  },
});

export default MainStackNavigation;
