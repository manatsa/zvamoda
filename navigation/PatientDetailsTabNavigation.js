import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PatientDetailsScreen from "../screens/patient/PatientDetailsScreen";
import PatientOperationsScreen from "../screens/patient/PatientOperationsScreen";
import Colors from "../config/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TabScreenOptions from "../utils/TabScreenOptions";

export default function PatientDetailsTabNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={TabScreenOptions}>
      <Tab.Screen
        name="patientDetailsDetails"
        component={PatientDetailsScreen}
        options={{
          tabBarLabel: "Client Details",
          tabBarIcon: ({ size, focused }) => (
            <MaterialCommunityIcons
              color={focused ? Colors.secondary : Colors.light}
              size={size}
              name="card-account-details"
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="PatientOperations"
        component={PatientOperationsScreen}
        options={{
          tabBarLabel: "Client Operations",
          tabBarIcon: ({ size, focused }) => (
            <MaterialCommunityIcons
              color={focused ? Colors.secondary : Colors.light}
              size={size}
              name="database-edit"
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
