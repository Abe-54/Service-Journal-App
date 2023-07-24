import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const NewEntryLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "New Journal Entry",
        headerTitleAlign: "center",
        headerStyle: styles.headerStyle,
      }}
    >
      <Stack.Screen
        name="chooseClient"
        options={{
          title: "Choose Client",
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
