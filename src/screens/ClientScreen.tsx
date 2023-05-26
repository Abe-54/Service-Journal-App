import { Stack, useSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Client } from "../../src/interfaces/Client";
import { getClientInvoices, getSingleClient } from "../api";
import InfoContainer from "../components/InfoContainer";
import InvoicesView from "../components/Invoices View/InvoicesView";
import Colors from "../constants/Colors";
import { Invoice } from "../interfaces/Invoice";
import { Order } from "../interfaces/Order";
import { Service } from "../interfaces/Service";
import normalizeName from "../util/NormalizeName";

const ClientScreen = () => {
  const { client_id } = useSearchParams();
  const [client, setClient] = useState<Client>();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [, setOrders] = useState<Order[]>([]);
  const [, setServices] = useState<Service[]>([]);

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

        // Extract and store the associated orders from the fetched invoices
        const fetchedOrders: Order[] = fetchedInvoices.flatMap(
          (invoice: Invoice) => invoice.Orders
        );
        setOrders(fetchedOrders);

        // Extract and store the associated services from the fetched orders
        const fetchedServices: Service[] = fetchedOrders.flatMap(
          (order: Order) => order.Services
        );
        setServices(fetchedServices);
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
