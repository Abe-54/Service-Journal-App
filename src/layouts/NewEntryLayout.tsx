import { Stack, router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Searchbar from "../components/Input Components/Searchbar";
import { SafeAreaView } from "react-native-safe-area-context";

const NewEntryLayout = () => {
  const params = useLocalSearchParams<{ q?: string }>();
  const [search, setSearch] = useState(params.q);
  const [clicked, setClicked] = useState(false);

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: styles.headerStyle,
      }}
    >
      <Stack.Screen
        name="chooseClient"
        options={{
          title: "Choose Client",
          header: () => <></>,

          // header: () => (
          //   <SafeAreaView
          //     style={{
          //       display: "flex",
          //       flexDirection: "row",
          //       backgroundColor: Colors.royal_blue[400],
          //       paddingHorizontal: 10,
          //       alignItems: "center",
          //     }}
          //   >
          //     <Ionicons
          //       name="arrow-back-outline"
          //       size={24}
          //       color="black"
          //       onPress={() => router.back()}
          //     />
          //     {/* <Searchbar
          //       searchPlaceholder="Choose Client..."
          //       searchPhrase={search ?? ""}
          //       setSearchPhrase={(search) => {
          //         setSearch;
          //         router.setParams({ q: search });
          //       }}
          //       clicked={clicked}
          //       setClicked={() => setClicked}
          //       OnCanceled={() => {}}
          //     /> */}
          //   </SafeAreaView>
          // ),
        }}
      />
      <Stack.Screen
        name="chooseService"
        options={{
          title: "Choose Service",
        }}
      />
      <Stack.Screen
        name="enterDetails"
        options={{
          title: "Enter Details",
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#858cc7",
  },
});

export default NewEntryLayout;
