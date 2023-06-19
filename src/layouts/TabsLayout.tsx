import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { getUser } from "../api";
import useUserStore from "../stores/UserStore";

const TabsLayout = () => {
  const [userName, setUserName] = useState("");
  const { getUserId } = useUserStore((state) => ({
    getUserId: state.userId,
  }));

  useEffect(() => {
    const getUserName = async () => {
      const id = await getUserId();
      const user = await getUser(id ?? "NO ID FOUND");
      setUserName(user.user_name);
    };
    getUserName();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarInactiveBackgroundColor: "#cbcee7",
        tabBarActiveBackgroundColor: "#b9bddf",
        tabBarActiveTintColor: "#505baf",
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="clientsTab"
        options={{
          title: "Clients",
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name="account-group"
              size={24}
              color={color}
            />
          ),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
        }}
      />
      <Tabs.Screen
        name="newEntryTab"
        options={{
          title: "New Entry",
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons name="plus" size={24} color={color} />
          ),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
        }}
      />
      <Tabs.Screen
        name="profileTab"
        options={{
          title: userName,
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons name="account" size={24} color={color} />
          ),
          headerTitleAlign: "center",
          headerStyle: styles.headerStyle,
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#858cc7",
  },
});

export default TabsLayout;
