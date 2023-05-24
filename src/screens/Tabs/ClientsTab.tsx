import { Provider, createStore, useAtom } from "jotai";
import React from "react";
import { FlatList } from "react-native";
import { clientsListAtom } from "../../atoms";
import ClientButton from "../../components/ClientButton";
import Colors from "../../constants/Colors";

const clientsAtom = clientsListAtom();

const clientsTab = () => {
  const [clients] = useAtom(clientsAtom);

  return (
    <FlatList
      data={clients}
      renderItem={({ item }) => <ClientButton client={item} />}
      style={{ backgroundColor: Colors.dark_green[500] }}
    />
  );
};

export default clientsTab;
