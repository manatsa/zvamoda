import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Image,
  Alert,
  LogBox,
  BackHandler,
} from "react-native";
import Colors from "../config/Colors";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StorageKeys from "../utils/StorageKeys";
import ActionButton from "react-native-circular-action-menu";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import EIcon from "react-native-vector-icons/Entypo";
import { ActivityIndicator } from "react-native-paper";
import { useToast } from "react-native-toast-notifications";
import AppText from "../components/wrappers/AppText";
import SynchronizeEntries from "../storage/SynchronizeEntries";
import AppNetworkInfo from "../utils/AppNetworkInfo";
import * as Animatable from "react-native-animatable";
import DatePickerExample from "./DatePickerExample";

function WelcomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isProceedLoading, setIsProceedLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [start, setStart] = useState(false);
  const [syncText, setSyncText] = useState("Sync in progress...wait");

  const toast = useToast();

  const getData = async () => {
    const t = await AsyncStorage.getItem(StorageKeys.tokenKey);
    setToken(t);
    const u = await AsyncStorage.getItem(StorageKeys.userKey);
    if (u) {
      const user = JSON.parse(u);
      setUser(user);
    }
  };

  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
    getData();
    const backAction = () => {
      Alert.alert("Confirm Exit!", "Are you sure you want to exit app?", [
        {
          text: "Don't Exit",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Confirm Exit", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const handleClearDataPress = async () => {
    const doit = async () => await AsyncStorage.clear();
    Alert.alert(
      "Clearing App Data",
      "Are you sure you want to clear all app data?",
      [
        { text: "No", onPress: () => {} },
        {
          text: "Proceed",
          onPress: () => {
            setIsLoading(true);
            doit();
            doit();
            doit();
            setIsLoading(false);
            Alert.alert(
              "Clear App Data",
              "All Data has been cleared successfully!\n\n Please note: You will need to login to access normal features!"
            );
          },
        },
      ],
      {
        cancealable: false,
      }
    );
  };

  const handleProceedPress = async () => {
    setIsProceedLoading(true);
    const user = await AsyncStorage.getItem(StorageKeys.userKey);
    if (user) {
      const patientString = await AsyncStorage.getItem("patients");
      const patientList = JSON.parse(patientString);
      setIsProceedLoading(false);
      navigation.navigate("patients", { patients: patientList });
    } else {
      setIsProceedLoading(false);
      navigation.navigate("login");
    }
  };

  const handleSynchronization = async () => {
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
        const user = await AsyncStorage.getItem(StorageKeys.userKey);
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
        setIsSyncing(false);
      }
    } else {
      Alert.alert(
        "Network Status",
        "You're not connected and cannot access online activities!.\n Please connect to internet and try agin."
      );
    }
    setIsSyncing(false);
  };

  const unsubscribe = NetInfo.addEventListener((state) => {
    if (!state.isConnected) {
      Alert.alert(
        (state.type || state.type === "none"
          ? state.type.toUpperCase()
          : "No") + " connection detected",
        "You are offline. \nYou may not be able to synchronize until you go online."
      );
      // toast.show(
      //   "You look like you are offline!\n You may not be able to access online functionality like synchronization!",
      //   {
      //     type: "error",
      //     duration: 2500,
      //     animationDuration: 1000,
      //     animationType: "zoom-in",
      //     placement: "bottom",
      //   }
      // );
    }
    // else {
    //   toast.show("Your internet connection looks fine!", {
    //     type: "success",
    //     duration: 2500,
    //     animationDuration: 1000,
    //     animationType: "zoom-in",
    //     placement: "bottom",
    //   });
    // }
    return state;
  });

  unsubscribe();

  const zoomIn = {
    0: {
      opacity: 0,
      scale: 0,
    },
    0.5: {
      opacity: 0.3,
      scale: 0.3,
    },
    1: {
      opacity: 1,
      scale: 1,
    },
  };

  const zoomOut = {
    0: {
      opacity: 1,
      scale: 1,
    },
    0.5: {
      opacity: 0.3,
      scale: 0.3,
    },
    1: {
      opacity: 0,
      scale: 0,
    },
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 8000,
      useNativeDriver: true,
    }).start(() => fadeOut());
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      fadeIn();
    });
  };

  useEffect(() => {
    fadeIn();
  }, [start]);

  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      style={styles.background}
    >
      <Animated.View style={[styles.logoContainer]}>
        <Animated.View
          style={[styles.logoImageContainer, , { opacity: fadeAnim }]}
        >
          <Image
            source={require("../assets/applogo.png")}
            style={styles.logo}
          />
        </Animated.View>
        <Animatable.Text
          animation="zoomIn"
          useNativeDriver={true}
          easing="ease-out"
          iterationCount="infinite"
          duration={5000}
          style={{ textAlign: "center" }}
        >
          <Text style={styles.tagline}>
            Zvandiri Mobile Database Application.
          </Text>
        </Animatable.Text>
      </Animated.View>

      {/* {<DatePickerExample />} */}
      {isSyncing && (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator
            size={"large"}
            animating={true}
            color={Colors.purple}
          />
          <View>
            <AppText style={styles.indicatorText}>{syncText}</AppText>
          </View>
        </View>
      )}

      <View style={styles.loginContainer}>
        <ActionButton
          buttonColor={Colors.secondary}
          radiua={150}
          btnOutRange={Colors.primary}
          outRangeScale={1.2}
          icon={
            <EIcon name="dots-three-vertical" size={25} color={Colors.light} />
          }
          degrees={180}
        >
          <ActionButton.Item
            buttonColor={Colors.danger}
            size={60}
            title="Clear App Data"
            onPress={handleClearDataPress}
          >
            <Icon name="close" style={styles.actionButtonIcon} />
          </ActionButton.Item>

          <ActionButton.Item
            buttonColor={Colors.greenish}
            title="Synchronize"
            size={60}
            onPress={handleSynchronization}
          >
            <Icon name="refresh" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor={Colors.primary}
            title="Proceed"
            size={60}
            onPress={handleProceedPress}
          >
            <EIcon name="arrow-bold-right" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    </ImageBackground>
    // </AppRotateScreenCenter>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoImageContainer: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light,
    borderColor: Colors.bluish,
    borderWidth: 0.6,
    borderRadius: 100,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: 50,
  },
  loginContainer: {
    paddingHorizontal: 10,
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
  },
  tagline: {
    fontSize: 20,
    fontWeight: "100",
    color: Colors.primary,
    textDecorationLine: "underline",
    paddingVertical: 20,
  },
  actionButtonIcon: {
    fontSize: 28,
    // height: 22,
    color: "white",
  },
  activityIndicatorContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  indicatorText: {
    color: Colors.primary,
  },
});
export default WelcomeScreen;
