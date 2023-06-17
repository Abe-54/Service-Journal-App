import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList } from "react-native";
import { getClients } from "../../api";
import ClientButton from "../../components/ClientButton";
import Colors from "../../constants/Colors";
import { Client } from "../../interfaces/Client";
import useUserStore from "../../stores/UserStore";

const clientsTab = () => {
  const router = useRouter();
  const { userId } = useUserStore((state) => ({
    userId: state.userId,
  }));

  const { isLoading, error, data, refetch } = useQuery<Client[], Error>(
    ["client", { client_id: userId ?? "NO ID FOUND" }],
    async () => await getClients(userId ?? "NO ID FOUND")
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
