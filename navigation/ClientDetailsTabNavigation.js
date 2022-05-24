import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import React from "react";
import Colors from "../config/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import ContactListScreen from "../screens/contact/ContactListScreen";
import NewContactScreen from "../screens/contact/NewContactScreen";
import TabScreenOptions from "../utils/TabScreenOptions";
import ClientListScreen from "../screens/client/ClientListScreen";
import NewClientScreen from "../screens/client/NewClientScreen";

export default function ClientDetailsTabNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={TabScreenOptions}>
      <Tab.Screen
        name="ClientList"
        component={ClientListScreen}
        options={{
          tabBarLabel: "Client List",
          tabBarIcon: ({ size, focused }) => (
            <MaterialIcons
              color={focused ? Colors.secondary : Colors.light}
              size={size}
              name="groups"
            />
          ),
        }}
      />
      <Tab.Screen
        name="NewClient"
        component={NewClientScreen}
        options={{
          tabBarLabel: "New Client",
          tabBarIcon: ({ size, focused }) => (
            <MaterialIcons
              color={focused ? Colors.secondary : Colors.light}
              size={size}
              name="person-add"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
