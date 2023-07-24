import { useQuery } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getClients } from "../api";
import Colors from "../constants/Colors";
import { Client } from "../interfaces/Client";
import useUserStore from "../stores/UserStore";
import ClientButton from "./ClientButton";

interface ClientListProps {
  renderItem: (client: Client) => JSX.Element;
}

const ClientList = ({ renderItem }: ClientListProps) => {
  const { getUserId } = useUserStore((state) => ({
    getUserId: state.userId,
  }));
  const [userId, setUserId] = useState<string | null>(null);

  React.useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      console.log("USER ID: " + id);
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

  let screenContent = (
    <ActivityIndicator
      size={"large"}
      color={Colors.royal_blue[200]}
      style={{ alignSelf: "center" }}
    />
  );

  if (!isLoading && data) {
    screenContent = (
      <FlatList data={data} renderItem={({ item }) => renderItem(item)} />
    );
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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: Colors.dark_green[400],
        margin: 5,
        borderRadius: 10,
      }}
    >
      {screenContent}
    </View>
  );
};

export default ClientList;

const styles = StyleSheet.create({});
