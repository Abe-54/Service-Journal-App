import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/Colors";
import { JournalEntry } from "../../../types/JournalEntry";
import EntryListHeader from "./EntryListHeader";
import EntryListItem from "./EntryListItem";

interface JournalEntryListProps {
  entries: JournalEntry[];
}

const JournalEntryList = ({ entries }: JournalEntryListProps) => {
  return (
    <FlatList
      data={entries}
      keyExtractor={(entry) => entry.journalEntry_id.toString()}
      ListHeaderComponent={<EntryListHeader />}
      renderItem={({ item: entry }) => <EntryListItem entry={entry} />}
      ListEmptyComponent={() => (
        <Text style={styles.entryListEmptyItem}>NO ENTRIES FOUND</Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  entryListEmptyItem: {
    backgroundColor: Colors.royal_blue[400],
    borderBottomWidth: 1,
    textAlign: "center",
  },
});

export default JournalEntryList;
