import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";
import { AppStateStatus, Platform } from "react-native";
import { useAppState } from "../hooks/useAppState";

const StackLayout = () => {
  return <Stack screenOptions={{ headerShown: true }} />;
};

export default StackLayout;
