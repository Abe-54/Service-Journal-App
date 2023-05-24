import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Redirect } from "expo-router";
import React from "react";

const StartPage = () => {
  return <Redirect href="/clientsTab" />;
};

export default StartPage;
