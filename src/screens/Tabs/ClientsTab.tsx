import { useQuery } from "@tanstack/react-query";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { getClients } from "../../api";
import ClientButton from "../../components/ClientButton";
import Colors from "../../constants/Colors";
import { Client } from "../../interfaces/Client";
import useUserStore from "../../stores/UserStore";

const clientsTab = () => {
  const router = useRouter();
  const { getUserId } = useUserStore((state) => ({
    getUserId: state.userId,
  }));
  const [userId, setUserId] = useState<string | null>(null);

  React.useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setUserId(id);
    };
    fetchUserId();
  }, [userId]);

  const { isLoading, error, data, refetch } = useQuery<Client[], Error>(
    ["client", { client_id: userId ?? "NO ID FOUND" }],
    async () => await getClients(userId ?? "NO ID FOUND")
  );

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [])
  );

  const handleClientPress = (clientId: string) => {
    router.push(`/clients/${clientId}`);
  };

  let screenContent = (
    <ActivityIndicator
      size={"large"}
      color={Colors.royal_blue[200]}
      style={{ alignSelf: "center" }}
    />
  );

  if (!isLoading && data) {
    screenContent =
      (console.log("USER DATA: " + JSON.stringify(data)),
      (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ClientButton
              client={item}
              onPress={() => handleClientPress(item.client_id.toString())}
            />
          )}
        />
      ));
  } else if (!isLoading && error.message.includes("401")) {
    screenContent = (
      <View
        style={{
          backgroundColor: Colors.royal_blue[500],
          margin: 10,
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            alignSelf: "center",
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          No account id found. Please log in again.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.dark_green[500],
        display: "flex",
        flexGrow: 1,
        justifyContent: data ? "flex-start" : "center",
      }}
    >
      {screenContent}
    </SafeAreaView>
  );
};

export default clientsTab;
