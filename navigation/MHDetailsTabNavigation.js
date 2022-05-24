import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import React from "react";
import Colors from "../config/Colors";
import {
  MaterialCommunityIcons,
  FontAwesome5,
} from "react-native-vector-icons";
import TabScreenOptions from "../utils/TabScreenOptions";
import NewMentalHealthScreeningScreen from "../screens/mh/NewMentalHealthScreeningScreen";
import MHListScreen from "../screens/mh/MHListScreen";

export default function MHDetailsTabNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={TabScreenOptions}>
      <Tab.Screen
        name="MHList"
        component={MHListScreen}
        options={{
          tabBarLabel: "M-Health List",
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
        name="NewMH"
        component={NewMentalHealthScreeningScreen}
        options={{
          tabBarLabel: "New M-Health",
          tabBarIcon: ({ size, focused }) => (
            <FontAwesome5
              color={focused ? Colors.secondary : Colors.light}
              size={size}
              name="pump-medical"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
