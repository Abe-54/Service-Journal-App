import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList } from "react-native";
import { getClients } from "../../api";
import ClientButton from "../../components/ClientButton";
import Colors from "../../constants/Colors";
import { Client } from "../../interfaces/Client";

const clientsTab = () => {
  const router = useRouter();

  const { isLoading, error, data, refetch } = useQuery<Client[], Error>(
    ["client", { client_id: "1" }],
    async () => await getClients("1")
  );

  const handleClientPress = (clientId: string) => {
    router.push(`/clients/${clientId}`);
  };

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <ClientButton
          client={item}
          onPress={() => handleClientPress(item.client_id.toString())}
        />
      )}
      style={{ backgroundColor: Colors.dark_green[500] }}
    />
  );
};

export default clientsTab;
