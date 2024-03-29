import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, Platform, Pressable, StyleSheet, Text } from "react-native";
import { getUser } from "../api";
import Colors from "../constants/Colors";
import useAuthStore from "../stores/AuthStore";
import useUserStore from "../stores/UserStore";

const TabsLayout = () => {
  const [userName, setUserName] = useState("");
  const { user } = useAuthStore((state) => ({ user: state.user }));

  useEffect(() => {
    const getUserName = async () => {
      const userData = await getUser(user?.uid ?? "NO ID FOUND");
      setUserName(userData?.user_name ?? "NO NAME FOUND");
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
          tabBarButton: (props) => {
            const children =
              Platform.OS === "web" ? (
                props.children
              ) : (
                <Pressable>{props.children}</Pressable>
              );

            return (
              <Link
                href="/chooseClient"
                style={[{ display: "flex" }, props.style]}
                asChild={Platform.OS !== "web"}
                children={children}
              />
            );
          },
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons name="plus" size={24} color={color} />
          ),
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
