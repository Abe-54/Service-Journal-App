import { Stack, useSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Client } from "../../src/interfaces/Client";
import { getSingleClient } from "../api";
import InfoContainer from "../components/InfoContainer";
import Colors from "../constants/Colors";
import { Invoice } from "../interfaces/Invoice";
import normalizeName from "../util/NormalizeName";

const ClientScreen = () => {
  const { client_id } = useSearchParams();
  const [client, setClient] = useState<Client>();
  const [invoices, setInvoices] = useState<Invoice[]>();

  useEffect(() => {
    const fetchClient = async () => {
      if (typeof client_id === "string") {
        const fetchedClient = await getSingleClient("1", client_id);
        setClient(fetchedClient);
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
            <View>
              <Text style={styles.invoiceListTitle}>Invoice List</Text>
            </View>
            <View style={styles.invoiceListContainer}>
              <FlatList
                data={[1, 2, 3, 4]}
                renderItem={({ item }) => (
                  <Text style={styles.invoiceListItem}> ITEM </Text>
                )}
              />
            </View>
          </View>
        </View>
      )}
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
    flex: 1,
    backgroundColor: Colors.royal_blue[200],
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
  },
  invoiceListItem: {
    backgroundColor: Colors.royal_blue[400],
    padding: 10,
    borderBottomWidth: 1,
  },
});

export default ClientScreen;
