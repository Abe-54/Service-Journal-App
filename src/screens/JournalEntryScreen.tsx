import { Stack, useLocalSearchParams, useSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getJournalEntry } from "../api";
import Colors from "../constants/Colors";
import { JournalEntry } from "../interfaces/JournalEntry";

const JournalEntryScreen = () => {
  const { journalEntry_id, client_id } = useLocalSearchParams<{
    journalEntry_id: string;
    client_id?: string;
  }>();
  const [entry, setEntry] = useState<JournalEntry>();

  useEffect(() => {
    const fetchEntry = async () => {
      if (journalEntry_id && client_id) {
        const fetchedEntry: JournalEntry = await getJournalEntry(
          "1",
          client_id,
          journalEntry_id
        );
        setEntry(fetchedEntry);
      }
    };
    fetchEntry();
  }, [journalEntry_id, client_id]);

  return (
    <View
      style={{
        backgroundColor: Colors.dark_green[500],
        display: "flex",
        flexGrow: 1,
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: `JOURNAL ID: ${journalEntry_id}`,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#858cc7" },
        }}
      />
      <View style={{ height: "100%" }}></View>
    </View>
  );
};

export default JournalEntryScreen;
