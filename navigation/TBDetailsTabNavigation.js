import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import React from "react";
import Colors from "../config/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ContactListScreen from "../screens/contact/ContactListScreen";
import NewContactScreen from "../screens/contact/NewContactScreen";
import TabScreenOptions from "../utils/TabScreenOptions";
import NewMentalHealthScreeningScreen from "../screens/mh/NewMentalHealthScreeningScreen";
import MHListScreen from "../screens/mh/MHListScreen";
import TBScreeningList from "../screens/tb/TBScreeningListScreen";
import TBScreeningListScreen from "../screens/tb/TBScreeningListScreen";
import NewTBScreeningScreen from "../screens/tb/NewTBScreeningScreen";

export default function TBDetailsTabNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={TabScreenOptions}>
      <Tab.Screen
        name="TBList"
        component={TBScreeningListScreen}
        options={{
          tabBarLabel: "TB Items List",
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
        name="NewTB"
        component={NewTBScreeningScreen}
        options={{
          tabBarLabel: "New TB Screening",
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
