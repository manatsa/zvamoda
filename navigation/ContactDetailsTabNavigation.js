import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import React from "react";
import Colors from "../config/Colors";
import {
  MaterialCommunityIcons,
  FontAwesome5,
} from "react-native-vector-icons";
import ContactListScreen from "../screens/contact/ContactListScreen";
import NewContactScreen from "../screens/contact/NewContactScreen";
import TabScreenOptions from "../utils/TabScreenOptions";

export default function ContactDetailsTabNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={TabScreenOptions}>
      <Tab.Screen
        name="ContactList"
        component={ContactListScreen}
        options={{
          tabBarLabel: "Contact List",
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
        name="NewContact"
        component={NewContactScreen}
        options={{
          tabBarLabel: "New Contact",
          tabBarIcon: ({ size, focused }) => (
            <FontAwesome5
              color={focused ? Colors.secondary : Colors.light}
              size={size}
              name="hand-holding-medical"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
