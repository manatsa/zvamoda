import Colors from "../config/Colors";

export default {
  tabBarActiveTintColor: Colors.secondary,
  tabBarActiveBackgroundColor: Colors.light,
  tabBarInactiveTintColor: Colors.light,
  tabBarStyle: {
    backgroundColor: Colors.secondary,
    color: Colors.light,
    justifyContent: "center",
    borderRadius: 25,
    borderColor: Colors.primary,
    borderWidth: 3,
    borderTopWidth: 0,
    alignItems: "center",
    height: 50,
  },
  tabBarLabelStyle: { fontSize: 16, fontWeight: "800" },
  headerShown: false,
};
