import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import React from "react";
import Colors from "../config/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ContactListScreen from "../screens/contact/ContactListScreen";
import NewContactScreen from "../screens/contact/NewContactScreen";
import TabScreenOptions from "../utils/TabScreenOptions";
import ReferralListScreen from "../screens/referral/ReferralListScreen";
import NewReferralScreen from "../screens/referral/NewReferralScreen";

export default function ReferralDetailsTabNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={TabScreenOptions}>
      <Tab.Screen
        name="ReferralList"
        component={ReferralListScreen}
        options={{
          tabBarLabel: "Referral List",
          tabBarIcon: ({ size, focused }) => (
            <MaterialCommunityIcons
              color={focused ? Colors.secondary : Colors.light}
              size={size}
              name="view-list"
            />
          ),
        }}
      />
      <Tab.Screen
        name="NewReferral"
        component={NewReferralScreen}
        options={{
          tabBarLabel: "New Referral",
          tabBarIcon: ({ size, focused }) => (
            <MaterialCommunityIcons
              color={focused ? Colors.secondary : Colors.light}
              size={size}
              name="email-plus"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
