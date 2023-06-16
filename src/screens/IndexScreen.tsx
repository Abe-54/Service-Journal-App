import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Redirect, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import useAuthStore from "../stores/AuthStore";

const StartPage = () => {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/clientsTab"); // Replace "/home" with the path to your authenticated screen
    }
  }, [isLoggedIn]);

  return <Redirect href="/sign-in" />;
};

export default StartPage;
