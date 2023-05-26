import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import { Invoice } from "../../interfaces/Invoice";
import InvoiceList from "./Invoices List/InvoiceList";

interface InvoicesViewProps {
  invoices: Invoice[];
}

const InvoicesView = ({ invoices }: InvoicesViewProps) => {
  return (
    <View
      style={{
        display: "flex",
        flexGrow: 1,
        paddingBottom: 15,
      }}
    >
      <View>
        <Text style={styles.invoiceListTitle}>Invoices</Text>
      </View>
      <View style={styles.invoiceListContainer}>
        <InvoiceList invoices={invoices} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  invoiceListTitle: {
    textAlign: "center",
    fontSize: 24,
    color: "white",
    fontWeight: "600",
    marginTop: 5,
  },
  invoiceListEmptyItem: {
    backgroundColor: Colors.royal_blue[400],
    borderBottomWidth: 1,
    textAlign: "center",
  },
  invoiceListContainer: {
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

export default InvoicesView;
