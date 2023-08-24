import { useQuery } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Colors from "../constants/Colors";
import useAuthStore from "../stores/AuthStore";

interface DataListProps<T> {
  dataFetcher: (userId: string | null) => Promise<T[]>;
  keyExtractor?: (item: T, index: number) => string;
  renderItem: (item: T) => JSX.Element;
  listHeader?: JSX.Element;
}

const DataList = <T extends unknown>({
  dataFetcher,
  renderItem,
  listHeader,
  keyExtractor,
}: DataListProps<T>) => {
  const { user } = useAuthStore((state) => ({
    user: state.user,
  }));
  // const [userId, setUserId] = useState<string | null>(null);

  // useEffect(() => {
  //   const id = getUser?.uid;
  //   console.log("USER ID: " + id);
  //   setUserId(id ?? null);
  // }, [userId]);

  const { isLoading, error, data, refetch } = useQuery<T[], Error>(
    ["data", { user_id: user?.uid ?? "NO ID FOUND" }],
    async () => await dataFetcher(user?.uid ?? "NO ID FOUND")
  );

  useEffect(() => {
    console.info("FETCHED DATA:", data ? data.length : "NO DATA");
  }, [data]);

  useFocusEffect(
    useCallback(() => {
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

  if (data) {
    screenContent = (
      <FlatList
        data={data}
        renderItem={({ item }) => renderItem(item)}
        ListHeaderComponent={listHeader}
        stickyHeaderIndices={listHeader ? [0] : undefined}
        keyExtractor={keyExtractor}
      />
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
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: Colors.dark_green[400],
      }}
    >
      {screenContent}
    </SafeAreaView>
  );
};

export default DataList;

const styles = StyleSheet.create({});
