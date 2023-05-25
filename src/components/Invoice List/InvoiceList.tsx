import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import { Invoice } from "../../interfaces/Invoice";
import InvoiceListHeader from "./InvoiceListHeader";

interface InvoicesListProps {
  invoices: Invoice[];
}

const InvoicesList = ({ invoices }: InvoicesListProps) => {
  return (
    <View>
      <View>
        <Text style={styles.invoiceListTitle}>Invoices</Text>
      </View>
      <View style={styles.invoiceListContainer}>
        <FlatList
          data={invoices}
          keyExtractor={(invoice) => invoice.invoice_id.toString()}
          ListHeaderComponent={<InvoiceListHeader />}
          renderItem={({ item: invoice }) => (
            <View style={{ backgroundColor: Colors.royal_blue[400] }}>
              <View style={styles.invoiceListItem}>
                <Text
                  style={styles.invoiceListItemText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {invoice.invoice_id}
                </Text>
                <View style={styles.divider} />
                <Text
                  style={[
                    styles.invoiceListItemText,
                    { width: "100%", fontSize: 16 },
                  ]}
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
          )}
          ListEmptyComponent={() => (
            <Text style={[styles.invoiceListItem, { textAlign: "center" }]}>
              NO INVOICES FOUND
            </Text>
          )}
        />
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
  invoiceListContainer: {
    backgroundColor: Colors.royal_blue[200],
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  invoiceListItem: {
    backgroundColor: Colors.royal_blue[400],
    justifyContent: "space-evenly",
    flexDirection: "row",
    flex: 1,
    borderBottomWidth: 1,
  },
  invoiceListItemText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
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

export default InvoicesList;
