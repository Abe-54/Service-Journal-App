import { Entypo, Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Link, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { getAllServices } from "../../api";
import CustomButton from "../../components/CustomButton";
import DataList from "../../components/DataList";
import Searchbar from "../../components/Input Components/Searchbar";
import StageIndicator from "../../components/StageIndicator";
import Colors from "../../constants/Colors";
import useNewEntryStore from "../../stores/NewEntryStore";
import { Service } from "../../types/Service";

const ChooseService = () => {
  const { client } = useLocalSearchParams<{ client: string }>();

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const { selectedServiceId, setSelectedServiceId } = useNewEntryStore();

  // useEffect(() => {
  //   console.log(selectedService?.service_name);
  // }, [selectedService]);

  const itemToRender = (item: Service) => {
    const isSelected = selectedServiceId === item.service_id;

    if (
      searchPhrase === "" ||
      item.service_name.toLowerCase().includes(searchPhrase.toLowerCase())
    ) {
      return (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <CustomButton
            onPress={() => {
              setSelectedServiceId(isSelected ? null : item.service_id);
            }}
            variant={isSelected ? "disabled" : "light_blue"}
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
          >
            <Text
              style={{
                color: "black",
                fontSize: 20,
                lineHeight: 28,
                fontWeight: "700",
              }}
            >
              {item.service_name}
            </Text>
          </CustomButton>
          {isSelected && (
            <Entypo
              name="cross"
              size={26}
              color="tomato"
              style={{ padding: 10, marginRight: 10 }}
              onPress={() => {
                setSearchPhrase("");
                setSelectedServiceId(null);
              }}
            />
          )}
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <DataList<Service>
        dataFetcher={(userId: string | null) => getAllServices(userId ?? "")}
        renderItem={(service: Service) => {
          return itemToRender(service) ?? <></>;
        }}
        keyExtractor={(item, index) => `${item.service_id}-${index}`}
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
                  setSelectedServiceId(null);
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

      {selectedServiceId != null ? (
        <View>
          <Link
            href={{
              pathname: "/enterDetails",
              params: { client: client, service: selectedServiceId },
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

export default ChooseService;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.dark_green[500],
    height: "100%",
  },
});
