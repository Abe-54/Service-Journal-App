import { Entypo, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ClientButton from "../../components/ClientButton";
import ClientList from "../../components/ClientList";
import CustomButton from "../../components/CustomButton";
import Searchbar from "../../components/Input Components/Searchbar";
import Colors from "../../constants/Colors";
import { Client } from "../../interfaces/Client";
import { router } from "expo-router";

const ChooseClient = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const itemToRender = (item: Client) => {
    const isSelected = selectedClient === item;

    if (
      searchPhrase === "" ||
      item.client_name.toLowerCase().includes(searchPhrase.toLowerCase())
    ) {
      return (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <ClientButton
            client={item}
            onPress={() => {
              setSelectedClient(isSelected ? null : item);
              console.log(selectedClient?.client_name);
            }}
            variant={isSelected ? "disabled" : "light_blue"}
          />
          {isSelected && (
            <Entypo
              name="cross"
              size={26}
              color="tomato"
              style={{ padding: 10, marginRight: 10 }}
              onPress={() => {
                setSearchPhrase("");
                setSelectedClient(null);
              }}
            />
          )}
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ClientList
        renderItem={(client) => {
          return itemToRender(client) ?? <></>;
        }}
        listHeader={
          <SafeAreaView
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: Colors.royal_blue[300],
              padding: 15,
              paddingBottom: 0,
              alignItems: "center",
            }}
          >
            <Ionicons
              name="arrow-back-outline"
              size={24}
              color="black"
              onPress={() => router.back()}
            />
            <Searchbar
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
              clicked={clicked}
              setClicked={setClicked}
              OnCanceled={() => {}}
            />
          </SafeAreaView>
        }
      />
      <View>
        <CustomButton
          variant="light_blue"
          style={{ margin: 20, padding: 15, borderRadius: 100 }}
        >
          <Text
            style={{ textAlign: "center", fontSize: 24, fontWeight: "600" }}
          >
            Next
          </Text>
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};

export default ChooseClient;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.dark_green[500],
    height: "100%",
  },
});
