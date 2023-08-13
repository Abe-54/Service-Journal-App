import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";
import { getClients } from "../../api";
import ClientButton from "../../components/ClientButton";
import DataList from "../../components/DataList";
import Colors from "../../constants/Colors";
import { Client } from "../../types/Client";

const clientsTab = () => {
  const router = useRouter();

  const handleClientPress = (clientId: string) => {
    router.push(`/clients/${clientId}`);
    console.log("Client pressed: " + clientId);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.dark_green[500],
        display: "flex",
        flexGrow: 1,
        justifyContent: "flex-start",
      }}
    >
      <DataList<Client>
        dataFetcher={(userId) => getClients(userId ?? "")}
        renderItem={(client) => (
          <ClientButton
            client={client}
            onPress={() => handleClientPress(client.client_id.toString())}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default clientsTab;
