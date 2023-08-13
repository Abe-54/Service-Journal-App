import { Ionicons } from "@expo/vector-icons";
import { Stack, router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Searchbar from "../components/Input Components/Searchbar";
import Colors from "../constants/Colors";

const NewEntryLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: styles.headerStyle,
      }}
    >
      <Stack.Screen
        name="chooseClient"
        options={{
          title: "Choose Client",
          header: () => <></>,
        }}
      />
      <Stack.Screen
        name="chooseService"
        options={{
          title: "Choose Service",
          header: () => <></>,
        }}
      />
      <Stack.Screen
        name="enterDetails"
        options={{
          title: "Enter Details",
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#858cc7",
  },
});

export default NewEntryLayout;
