import { Link, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { createJournalEntry, getServiceById, getSingleClient } from "../../api";
import CustomButton from "../../components/CustomButton";
import StageIndicator from "../../components/StageIndicator";
import Colors from "../../constants/Colors";
import useAuthStore from "../../stores/AuthStore";
import useNewEntryStore from "../../stores/NewEntryStore";

const ConfirmEntry = () => {
  const {
    selectedClientId,
    selectedServiceId,
    entryDate,
    entryPrice,
    entryDescription,
    entryStatus,
    resetStore,
  } = useNewEntryStore();

  const { user } = useAuthStore();

  const [clientName, setClientName] = useState("");
  const [serviceName, setServiceName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (selectedClientId && user?.uid && selectedServiceId) {
        const fetchedClient = await getSingleClient(
          user.uid,
          selectedClientId.toString()
        );

        const fetchedService = await getServiceById(
          user.uid,
          selectedServiceId
        );

        const initialName = fetchedClient.client_name
          .replace(",", "")
          .split(" ");
        const lastName = initialName.shift();
        const firstName = initialName.join(" ");
        const fullName = `${firstName} ${lastName}`;

        setClientName(fullName);
        setServiceName(fetchedService.service_name);
      }
    };

    fetchData();
  }, [selectedClientId, selectedServiceId, user]);

  const handleConfirmation = async () => {
    if (user?.uid) {
      await createJournalEntry(
        user.uid,
        selectedClientId ?? 0,
        entryStatus ?? "",
        entryDescription ?? "",
        selectedServiceId ?? 0,
        entryPrice ?? 0,
        entryDate ?? new Date()
      );

      console.log("Entry created");
    }

    resetStore();
    router.replace(`/clients/${selectedClientId}`);
  };

  return (
    <ScrollView
      style={{ backgroundColor: Colors.dark_green[500] }}
      contentContainerStyle={styles.confirmationContainer}
    >
      <View style={styles.itemContainer}>
        <Text style={styles.confirmationText}>Client:</Text>
        <Text style={styles.infoEnteredText}>{clientName}</Text>
      </View>

      <View style={styles.itemContainer}>
        <Text style={styles.confirmationText}>Service:</Text>
        <Text style={styles.infoEnteredText}>{serviceName}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.confirmationText}>Service Date:</Text>
        <Text style={styles.infoEnteredText}>{entryDate?.toDateString()}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.confirmationText}>Price:</Text>
        <Text style={styles.infoEnteredText}>
          {entryPrice?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Text>
      </View>
      <View
        style={[
          styles.itemContainer,
          { maxHeight: 200, justifyContent: "flex-start" },
        ]}
      >
        <ScrollView>
          <Text style={styles.confirmationText}>Description:</Text>
          <Text style={[styles.infoEnteredText, { fontSize: 16 }]}>
            {entryDescription || "No description entered"}
          </Text>
        </ScrollView>
      </View>

      <View style={styles.itemContainer}>
        <Text style={styles.confirmationText}>Status:</Text>
        <Text style={styles.infoEnteredText}>{entryStatus}</Text>
      </View>

      <View>
        {/* <Link href="/" asChild> */}
        <CustomButton
          variant="light_blue"
          style={{ marginHorizontal: 10, padding: 10, borderRadius: 100 }}
          onPress={() => {
            handleConfirmation();
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 24,
              fontWeight: "600",
            }}
          >
            Create Entry
          </Text>
        </CustomButton>
        {/* </Link> */}
      </View>

      <StageIndicator currentStage={4} totalStages={4} />
    </ScrollView>
  );
};

export default ConfirmEntry;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark_green[500],
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.royal_blue[200],
    borderRadius: 5,
    padding: 10,
  },
  confirmationContainer: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    margin: 10,
    justifyContent: "space-between",
  },
  confirmationText: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoEnteredText: {
    fontSize: 20,
    color: "dimgray",
    fontWeight: "bold",
    marginBottom: 10,
    paddingRight: 15,
  },
});
