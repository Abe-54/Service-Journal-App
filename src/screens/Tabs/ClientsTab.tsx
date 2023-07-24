import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";
import { getClients } from "../../api";
import ClientButton from "../../components/ClientButton";
import ClientList from "../../components/ClientList";
import Colors from "../../constants/Colors";

const clientsTab = () => {
  const router = useRouter();

  const handleClientPress = (clientId: string) => {
    router.push(`/clients/${clientId}`);
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
      <ClientList
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
