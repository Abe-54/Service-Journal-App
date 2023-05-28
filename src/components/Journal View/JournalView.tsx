import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import { JournalEntry } from "../../interfaces/JournalEntry";
import JournalEntryList from "./Journal Entry List/JournalEntryList";

interface JournalViewProps {
  journalEntries: JournalEntry[];
}

const JournalView = ({ journalEntries }: JournalViewProps) => {
  return (
    <View
      style={{
        display: "flex",
        flexGrow: 1,
        paddingBottom: 15,
      }}
    >
      <View>
        <Text style={styles.journalListTitle}>Journal Entries</Text>
      </View>
      <View style={styles.journalListContainer}>
        <JournalEntryList entries={journalEntries} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  journalListTitle: {
    textAlign: "center",
    fontSize: 24,
    color: "white",
    fontWeight: "600",
    marginTop: 5,
  },
  journalListEmptyItem: {
    backgroundColor: Colors.royal_blue[400],
    borderBottomWidth: 1,
    textAlign: "center",
  },
  journalListContainer: {
    backgroundColor: Colors.royal_blue[400],
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: "hidden",
    flex: 1,
  },
  divider: {
    height: "100%",
    width: 2.2,
    backgroundColor: "black",
    margin: 0,
    padding: 0,
  },
});

export default JournalView;
