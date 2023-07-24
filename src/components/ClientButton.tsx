import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Colors from "../constants/Colors";
import { Client } from "../interfaces/Client";
import normalizeName from "../util/NormalizeName";
import CustomButton from "./CustomButton";

interface ClientButtonProps {
  client: Client;
  variant?: "light_blue" | "disabled";
  onPress: () => void;
}

const ClientButton = ({
  client,
  onPress,
  variant = "light_blue",
}: ClientButtonProps) => {
  return (
    <CustomButton
      variant={variant}
      style={{
        display: "flex",
        flexDirection: "row",
        flexGrow: 1,
        alignItems: "center",
        padding: 20,
        marginHorizontal: 8,
        marginVertical: 16,
        borderRadius: 5,
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
        {normalizeName(client)}
      </Text>
    </CustomButton>
  );
};

export default ClientButton;
