import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/Colors";
import { JournalEntry } from "../../../interfaces/JournalEntry";
import CustomButton from "../../CustomButton";

interface EntryListItemProps {
  entry: JournalEntry;
}

const EntryListItem = ({ entry }: EntryListItemProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(
      `/clients/entries/${entry.journalEntry_id}?client_id=${entry.client_id}`
    );
  };

  const firstDateWithinEntry = new Date(entry.serviceDates[0].service_date);

  return (
    <CustomButton onPress={handleClick} variant="primary">
      <View style={styles.entryListItem}>
        <Text
          style={[styles.entryListItemText]}
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          ellipsizeMode="middle"
        >
          {entry.journalEntry_id}
        </Text>
        <View style={styles.divider} />
        <Text
          style={[styles.entryListItemText]}
          adjustsFontSizeToFit={true}
          minimumFontScale={0.8}
          numberOfLines={1}
          ellipsizeMode="middle"
        >
          {firstDateWithinEntry.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            timeZone: "UTC",
          }) || "No Service"}
        </Text>
        <View style={styles.divider} />
        <Text
          style={styles.entryListItemText}
          adjustsFontSizeToFit={true}
          minimumFontScale={0.8}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {entry.status}
        </Text>
      </View>
    </CustomButton>
  );
};

const styles = StyleSheet.create({
  entryListItem: {
    // backgroundColor: Colors.royal_blue[400],
    justifyContent: "space-around",
    flexDirection: "row",
    flex: 1,
    borderBottomWidth: 2,
  },
  entryListItemText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    padding: 10,
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

export default EntryListItem;
