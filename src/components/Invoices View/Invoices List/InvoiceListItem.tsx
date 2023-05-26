import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/Colors";
import { Invoice } from "../../../interfaces/Invoice";

interface InvoiceListItemProps {
  invoice: Invoice;
}

const InvoiceListItem = ({ invoice }: InvoiceListItemProps) => {
  return (
    <View style={{ backgroundColor: Colors.royal_blue[400] }}>
      <View style={styles.invoiceListItem}>
        <Text
          style={[styles.invoiceListItemText]}
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          ellipsizeMode="middle"
        >
          {invoice.Orders.Services.title || "No Service"}
        </Text>
        <View style={styles.divider} />
        <Text
          style={styles.invoiceListItemText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {invoice.status}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  invoiceListItem: {
    backgroundColor: Colors.royal_blue[400],
    justifyContent: "space-around",
    flexDirection: "row",
    flex: 1,
    borderBottomWidth: 2,
  },
  invoiceListItemText: {
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

export default InvoiceListItem;
