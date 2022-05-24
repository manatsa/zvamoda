import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import React from "react";
import Colors from "../config/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import TabScreenOptions from "../utils/TabScreenOptions";
import NewVLCD4Screen from "../screens/vl/NewVLCD4Screen";
import VLCD4ListScreen from "../screens/vl/VLCD4ListScreen";

export default function VLCD4DetailsTabNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={TabScreenOptions}>
      <Tab.Screen
        name="VLCD4List"
        component={VLCD4ListScreen}
        options={{
          tabBarLabel: "VL/CD4 List",
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
        name="NewVLCD4"
        component={NewVLCD4Screen}
        options={{
          tabBarLabel: "New VLCD4",
          tabBarIcon: ({ size, focused }) => (
            <MaterialCommunityIcons
              color={focused ? Colors.secondary : Colors.light}
              size={size}
              name="clipboard-plus"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
