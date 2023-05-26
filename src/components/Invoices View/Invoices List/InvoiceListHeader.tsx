import { StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/Colors";

const InvoiceListHeader = () => {
  return (
    <View style={styles.invoiceListContainerHeader}>
      <Text style={styles.invoiceListContainerHeaderText}>SERVICE</Text>
      <View style={styles.divider} />
      <Text style={styles.invoiceListContainerHeaderText}>STATUS</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  invoiceListContainerHeader: {
    backgroundColor: Colors.royal_blue[200],
    justifyContent: "space-evenly",
    flexDirection: "row",
    flex: 1,
    borderBottomWidth: 2,
  },
  invoiceListContainerHeaderText: {
    textAlign: "center",
    fontSize: 18,
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

export default InvoiceListHeader;
