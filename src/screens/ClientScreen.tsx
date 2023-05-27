import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Client } from "../../src/interfaces/Client";
import { getClientJournal, getSingleClient } from "../api";
import InfoContainer from "../components/InfoContainer";
import JournalView from "../components/Invoices View/JournalView";
import Colors from "../constants/Colors";
import { JournalEntry } from "../interfaces/JournalEntry";
import normalizeName from "../util/NormalizeName";

const ClientScreen = () => {
  const { client_id } = useLocalSearchParams();
  const [client, setClient] = useState<Client>();
  const [journal, setJournal] = useState<JournalEntry[]>([]);

  useEffect(() => {
    const fetchClient = async () => {
      if (typeof client_id === "string") {
        const fetchedClient: Client = await getSingleClient("1", client_id);
        setClient(fetchedClient);

        const fetchedJournal: JournalEntry[] = await getClientJournal(
          "1",
          client_id
        );
        setJournal(fetchedJournal);
      }
    };

    fetchClient();
  }, [client_id]);

  return (
    <View
      style={{
        backgroundColor: Colors.dark_green[500],
        display: "flex",
        flexGrow: 1,
      }}
    >
      {client === undefined ? (
        <Text style={{ color: Colors.error }}>CLIENT is undefined</Text>
      ) : (
        <View>
          <Stack.Screen
            options={{
              headerTitle: `${normalizeName(client)}`,
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "#858cc7" },
            }}
          />
          <View style={{ height: "100%" }}>
            <InfoContainer client={client} />
            <JournalView journalEntries={journal} />
          </View>
        </View>
      )}
    </View>
  );
};

export default ClientScreen;
