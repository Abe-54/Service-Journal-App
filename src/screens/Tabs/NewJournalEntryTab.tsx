import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { getAllServices, getClients, getUser } from "../../api";
import DropdownComponent from "../../components/Input Components/DropdownComponent";
import Colors from "../../constants/Colors";
import { Client } from "../../interfaces/Client";
import useUserStore from "../../stores/UserStore";
import normalizeName from "../../util/NormalizeName";

const statusOptions = [
  { label: "Not Started", value: "not started" },
  { label: "In Progress", value: "in progress" },
  { label: "Completed", value: "completed" },
];

const NewJournalEntry = () => {
  const [client, setClient] = useState("");
  const [service, setService] = useState("");
  const [clientData, setClientData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [status, setStatus] = useState("");

  const { getUserId } = useUserStore((state) => ({
    getUserId: state.userId,
  }));

  useEffect(() => {
    const fetchClients = async () => {
      const id = await getUserId();
      const clients = await getClients(id ?? "NO ID FOUND");
      const clientData = clients.map((client: Client) => {
        return {
          label: normalizeName(client),
          value: client.client_id,
        };
      });
      setClientData(clientData);
    };

    const fetchServices = async () => {
      const id = await getUserId();
      const services = await getAllServices(id ?? "NO ID FOUND");
      const serviceData = services.map((service: any) => {
        return {
          label: service.service_name,
          value: service.service_id,
        };
      });
      setServiceData(serviceData);
    };

    fetchClients();
    fetchServices();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.entireFormContainer}>
        <DropdownComponent
          label="Client"
          value={client}
          onChange={(value) => setClient(value)}
          data={clientData}
          placeholder="Select Client"
          searchPlaceholder="Search..."
        />

        <DropdownComponent
          label="Service"
          value={service}
          onChange={(value) => setService(value)}
          data={serviceData}
          placeholder="Select Service"
          searchPlaceholder="Search..."
        />

        <DropdownComponent
          label="Status"
          value={status}
          onChange={(value) => setStatus(value)}
          data={statusOptions}
          placeholder="Select Status"
          canSearch={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    display: "flex",
    flexGrow: 1,
    backgroundColor: Colors.dark_green[500],
  },
  entireFormContainer: {
    display: "flex",
    flexGrow: 1,
    marginTop: 20,
    rowGap: 20,
  },
});

export default NewJournalEntry;
