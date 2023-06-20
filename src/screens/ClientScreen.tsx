import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Client } from "../../src/interfaces/Client";
import { deleteClient, getClientJournal, getSingleClient } from "../api";
import InfoContainer from "../components/InfoContainer";
import JournalView from "../components/Journal View/JournalView";
import Colors from "../constants/Colors";
import { JournalEntry } from "../interfaces/JournalEntry";
import useUserStore from "../stores/UserStore";
import normalizeName from "../util/NormalizeName";

const ClientScreen = () => {
  const { client_id } = useLocalSearchParams();
  const { getUserId } = useUserStore((state) => ({
    getUserId: state.userId,
  }));
  const router = useRouter();

  const {
    isLoading: isClientLoading,
    error: clientError,
    data: clientData,
    refetch: refetchClient,
  } = useQuery<Client, Error>(
    ["client", { client_id: String(client_id) }],
    async () => {
      const id = (await getUserId()) ?? "NO ID FOUND";
      const client = await getSingleClient(id, String(client_id));
      return client;
    }
  );

  const {
    isLoading: isJournalLoading,
    error: journalError,
    data: journalData,
    refetch: refetchJournal,
  } = useQuery<JournalEntry[], Error>(
    ["journal", { client_id: String(client_id) }],
    async () => {
      const id = (await getUserId()) ?? "NO ID FOUND";
      const journal = await getClientJournal(
        id ?? "NO ID FOUND",
        String(client_id)
      );
      return journal;
    }
  );

  const displayClientData = [
    { title: "City", value: clientData?.city ?? "No City" },
    { title: "Street", value: clientData?.street ?? "No Street" },
    {
      title: "House",
      value: clientData?.house_number.toString() ?? "No House Number",
    },
  ];

  const handleDeleteClient = async (id: number) => {
    const userId = await getUserId();
    if (userId) {
      await deleteClient(userId, id);
      router.replace("/");
    }
  };

  if (clientError)
    return (
      <Text style={{ color: Colors.error }}>Error: {clientError.message}</Text>
    );
  if (journalError)
    return (
      <Text style={{ color: Colors.error }}>Error: {journalError.message}</Text>
    );

  return (
    <View
      style={{
        backgroundColor: Colors.dark_green[500],
        display: "flex",
        flexGrow: 1,
      }}
    >
      <View>
        {isClientLoading ? (
          <Text>Loading Client...</Text>
        ) : (
          <Stack.Screen
            options={{
              headerTitle: `${normalizeName(clientData)}`,
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "#858cc7" },
              headerRight: () => (
                <MaterialCommunityIcons
                  name="account-remove"
                  size={24}
                  color="white"
                  onPress={() =>
                    handleDeleteClient(parseInt(String(client_id)))
                  }
                />
              ),
            }}
          />
        )}
        <View style={{ height: "100%" }}>
          <InfoContainer
            data={displayClientData}
            title={"Client Information"}
            onUpdate={() => {}}
          />
          {isJournalLoading ? (
            <Text> Loading Journal...</Text>
          ) : (
            <JournalView journalEntries={journalData} />
          )}
        </View>
      </View>
    </View>
  );
};

export default ClientScreen;
