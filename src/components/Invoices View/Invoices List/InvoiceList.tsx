import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/Colors";
import { Invoice } from "../../../interfaces/Invoice";
import InvoiceListHeader from "./InvoiceListHeader";
import InvoiceListItem from "./InvoiceListItem";

interface InvoiceListProps {
  invoices: Invoice[];
}

const InvoiceList = ({ invoices }: InvoiceListProps) => {
  return (
    <FlatList
      data={invoices}
      keyExtractor={(invoice) => invoice.invoice_id.toString()}
      ListHeaderComponent={<InvoiceListHeader />}
      renderItem={({ item: invoice }) => <InvoiceListItem invoice={invoice} />}
      ListEmptyComponent={() => (
        <Text style={styles.invoiceListEmptyItem}>NO INVOICES FOUND</Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  invoiceListEmptyItem: {
    backgroundColor: Colors.royal_blue[400],
    borderBottomWidth: 1,
    textAlign: "center",
  },
});

export default InvoiceList;
