import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Colors from "../../../constants/Colors";
import { Invoice } from "../../../interfaces/Invoice";
import CustomButton from "../../CustomButton";

interface InvoiceListItemProps {
  invoice: Invoice;
}

const InvoiceListItem = ({ invoice }: InvoiceListItemProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(
      `/clients/invoices/${invoice.invoice_id}?client_id=${invoice.client_id}`
    );
  };

  const firstDateWithinInvoice = new Date(invoice.Orders[0].service_date);

  return (
    <CustomButton onPress={handleClick} variant="primary">
      <View style={styles.invoiceListItem}>
        <Text
          style={[styles.invoiceListItemText]}
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          ellipsizeMode="middle"
        >
          {invoice.invoice_id}
        </Text>
        <View style={styles.divider} />
        <Text
          style={[styles.invoiceListItemText]}
          adjustsFontSizeToFit={true}
          minimumFontScale={0.8}
          numberOfLines={1}
          ellipsizeMode="middle"
        >
          {firstDateWithinInvoice.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            timeZone: "UTC",
          }) || "No Service"}
        </Text>
        <View style={styles.divider} />
        <Text
          style={styles.invoiceListItemText}
          adjustsFontSizeToFit={true}
          minimumFontScale={0.8}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {invoice.status}
        </Text>
      </View>
    </CustomButton>
  );
};

const styles = StyleSheet.create({
  invoiceListItem: {
    // backgroundColor: Colors.royal_blue[400],
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
