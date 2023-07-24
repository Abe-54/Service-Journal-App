import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/Colors";

const EntryListHeader = () => {
  return (
    <View style={styles.entryListContainerHeader}>
      <Text style={styles.entryListContainerHeaderText}>ID</Text>
      <View style={styles.divider} />
      <Text style={styles.entryListContainerHeaderText}>DATE</Text>
      <View style={styles.divider} />
      <Text style={styles.entryListContainerHeaderText}>STATUS</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  entryListContainerHeader: {
    backgroundColor: Colors.royal_blue[200],
    justifyContent: "space-evenly",
    flexDirection: "row",
    flex: 1,
    borderBottomWidth: 2,
  },
  entryListContainerHeaderText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
    padding: 10,
  },
  divider: {
    height: "100%",
    width: 2.2,
    backgroundColor: "black",
    margin: 0,
    padding: 0,
  },
});

export default EntryListHeader;
