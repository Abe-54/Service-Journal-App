import { Stack, useSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Client } from "../../src/interfaces/Client";
import { getClientInvoices, getSingleClient } from "../api";
import InfoContainer from "../components/InfoContainer";
import InvoicesView from "../components/Invoices View/InvoicesView";
import Colors from "../constants/Colors";
import { Invoice } from "../interfaces/Invoice";
import normalizeName from "../util/NormalizeName";

const ClientScreen = () => {
  const { client_id } = useSearchParams();
  const [client, setClient] = useState<Client>();
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const fetchClient = async () => {
      if (typeof client_id === "string") {
        const fetchedClient: Client = await getSingleClient("1", client_id);
        setClient(fetchedClient);

        const fetchedInvoices: Invoice[] = await getClientInvoices(
          "1",
          client_id
        );
        setInvoices(fetchedInvoices);
      }
    };

    fetchClient();
  }, [client_id]);

  return (
    <View
      style={{
        backgroundColor: Colors.dark_green[500],
        display: "flex",
        flexGrow: 1,
      }}
    >
      {client === undefined ? (
        <Text style={{ color: Colors.error }}>CLIENT is undefined</Text>
      ) : (
        <View>
          <Stack.Screen
            options={{
              headerTitle: `${normalizeName(client)}`,
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "#858cc7" },
            }}
          />
          <View style={{ height: "100%" }}>
            <InfoContainer client={client} />
            <InvoicesView invoices={invoices} />
          </View>
        </View>
      )}
    </View>
  );
};

export default ClientScreen;
