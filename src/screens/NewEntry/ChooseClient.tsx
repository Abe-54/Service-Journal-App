import { Entypo, Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getClients } from "../../api";
import ClientButton from "../../components/ClientButton";
import CustomButton from "../../components/CustomButton";
import DataList from "../../components/DataList";
import Searchbar from "../../components/Input Components/Searchbar";
import StageIndicator from "../../components/StageIndicator";
import Colors from "../../constants/Colors";
import useNewEntryStore from "../../stores/NewEntryStore";
import { Client } from "../../types/Client";

const ChooseClient = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const { selectedClientId, setSelectedClientId, resetStore } =
    useNewEntryStore();

  const itemToRender = (item: Client) => {
    const isSelected = selectedClientId === item.client_id;

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
            key={item.client_id}
            onPress={() => {
              setSelectedClientId(isSelected ? null : item.client_id);
              console.log("Selected: " + item.client_name);
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
                setSelectedClientId(null);
              }}
            />
          )}
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <DataList<Client>
        dataFetcher={(userId) => getClients(userId ?? "")}
        renderItem={(client: Client) => {
          return itemToRender(client) ?? <></>;
        }}
        listHeader={
          <SafeAreaView
            style={{
              backgroundColor: Colors.royal_blue[300],
              padding: 15,
              paddingBottom: 0,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="arrow-back-outline"
                size={24}
                color="black"
                onPress={() => {
                  resetStore();
                  router.back();
                }}
              />
              <Searchbar
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                clicked={clicked}
                setClicked={setClicked}
                OnCanceled={() => {}}
              />
            </View>
          </SafeAreaView>
        }
      />

      {selectedClientId != null ? (
        <View>
          <Link
            href={{
              pathname: "/chooseService",
              params: { client: selectedClientId },
            }}
            asChild
          >
            <CustomButton
              variant="light_blue"
              style={{ margin: 15, padding: 15, borderRadius: 100 }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 24,
                  fontWeight: "600",
                }}
              >
                Next
              </Text>
            </CustomButton>
          </Link>
        </View>
      ) : (
        <></>
      )}

      <StageIndicator currentStage={3} totalStages={4} />
    </SafeAreaView>
  );
};

export default ChooseClient;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.dark_green[500],
    height: "100%",
  },
  indicatorContainer: {
    borderColor: Colors.error,
    borderWidth: 1,
  },
});
