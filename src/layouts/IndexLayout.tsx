import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";
import { AppStateStatus, Platform } from "react-native";
import { useAppState } from "../hooks/useAppState";

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const queryClient = new QueryClient();

const StackLayout = () => {
  useAppState(onAppStateChange);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  );
};

export default StackLayout;
