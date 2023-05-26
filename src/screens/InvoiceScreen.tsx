import { Stack, useLocalSearchParams, useSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getInvoice } from "../api";
import Colors from "../constants/Colors";
import { Invoice } from "../interfaces/Invoice";

const InvoiceScreen = () => {
  const { invoice_id, client_id } = useLocalSearchParams<{
    invoice_id: string;
    client_id?: string;
  }>();
  const [invoice, setInvoice] = useState<Invoice>();

  useEffect(() => {
    const fetchInvoice = async () => {
      if (invoice_id && client_id) {
        const fetchedInvoice: Invoice = await getInvoice(
          "1",
          client_id,
          invoice_id
        );
        setInvoice(fetchedInvoice);
      }
    };
    fetchInvoice();
  }, [invoice_id, client_id]);

  return (
    <View
      style={{
        backgroundColor: Colors.dark_green[500],
        display: "flex",
        flexGrow: 1,
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: `INVOICE ID: ${invoice_id}`,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#858cc7" },
        }}
      />
      <View style={{ height: "100%" }}></View>
    </View>
  );
};

export default InvoiceScreen;
