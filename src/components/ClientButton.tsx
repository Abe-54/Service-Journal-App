import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Colors from "../constants/Colors";
import { Client } from "../interfaces/Client";

interface ClientButtonProps {
  client: Client;
  backgroundColor: string;
  onPress: () => void;
}

const ClientButton = ({
  client,
  backgroundColor,
  onPress,
}: ClientButtonProps) => {
  return (
    <Pressable
      style={{
        backgroundColor,
        display: "flex",
        flexDirection: "row",
        flexGrow: 1,
        alignItems: "center",
        padding: 20,
        margin: 16,
        borderRadius: 8,
      }}
      android_disableSound={false}
      onPress={onPress}
    >
      <Text
        style={{
          color: "black",
          fontSize: 20,
          lineHeight: 28,
          fontWeight: "700",
        }}
      >
        {client.client_name}
      </Text>
    </Pressable>
  );
};

export default ClientButton;
