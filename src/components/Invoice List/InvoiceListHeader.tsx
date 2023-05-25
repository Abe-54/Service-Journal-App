import { StyleSheet, Text, View } from "react-native";

const InvoiceListHeader = () => {
  return (
    <View style={styles.invoiceListContainerHeader}>
      <Text style={styles.invoiceListContainerHeaderText}>ID</Text>
      <View style={styles.divider} />
      <Text style={styles.invoiceListContainerHeaderText}>SERVICE</Text>
      <View style={styles.divider} />
      <Text style={styles.invoiceListContainerHeaderText}>STATUS</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  invoiceListContainerHeader: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    flex: 1,
    borderBottomWidth: 1,
  },
  invoiceListContainerHeaderText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    width: "100%",
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

export default InvoiceListHeader;
