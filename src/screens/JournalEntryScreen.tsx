import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar, CalendarProvider } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import { getAllServices, getJournalEntry, updateJournalEntry } from "../api";
import InfoContainer from "../components/InfoContainer";
import Colors from "../constants/Colors";
import useAuthStore from "../stores/AuthStore";
import { JournalEntry } from "../types/JournalEntry";
import { Service } from "../types/Service";

interface JournalEntryItem {
  title: string;
  value: string;
  isNumeric?: boolean;
  isCurrency?: boolean;
  type?: "text" | "dropdown";
  options?: string[];
}

const initialJournalEntry: JournalEntryItem[] = [
  {
    title: "Service",
    value: "No Service",
  },
  {
    title: "Price",
    value: "No Price",
  },
  {
    title: "Status",
    value: "No Status",
  },
];

const JournalEntryScreen = () => {
  const { journalEntry_id, client_id } = useLocalSearchParams<{
    journalEntry_id: string;
    client_id?: string;
  }>();
  const [editable, setEditable] = useState<boolean>(false);
  const [journalEntry, setJournalData] = useState([...initialJournalEntry]);
  const [tempJournalData, seTempJournalData] = useState<JournalEntryItem[]>([
    ...initialJournalEntry,
  ]);
  const { user } = useAuthStore();

  const {
    isLoading: isEntryLoading,
    error: entryError,
    data: entryData,
    refetch: refetchEntry,
  } = useQuery<JournalEntry, Error>(
    [
      "journalEntry",
      {
        client_id: String(client_id),
        journalEntry_id: String(journalEntry_id),
      },
    ],
    async () =>
      await getJournalEntry(
        user?.uid ?? "NO ID FOUND",
        String(client_id),
        String(journalEntry_id)
      )
  );

  const {
    isLoading: isServicesLoading,
    error: servicesError,
    data: servicesData,
    refetch: refetchServices,
  } = useQuery<Service[], Error>(
    ["services", {}],
    async () => await getAllServices("1")
  );

  useEffect(() => {
    if (!isEntryLoading && !isServicesLoading) {
      const initialData: JournalEntryItem[] = [
        {
          title: "Service",
          value: entryData?.Service.service_name || "No Service",
          type: "dropdown",
          options:
            servicesData?.flatMap((service) => service.service_name) || [],
        },
        {
          title: "Price",
          value: entryData?.price || "0",
          isNumeric: true,
          isCurrency: true,
        },
        {
          title: "Status",
          value: entryData?.status || "No Status",
          type: "dropdown",
          options: ["Not Started", "In Progress", "Completed"],
        },
      ];

      setJournalData(initialData);
      seTempJournalData(initialData);
    }
  }, [isEntryLoading]);

  const serviceDates = entryData?.serviceDates.reduce(
    (markedDates, serviceDate) => {
      const formattedDate = new Date(serviceDate.service_date)
        .toISOString()
        .slice(0, 10);
      markedDates[formattedDate] = {
        color: Colors.royal_blue[500],
        textColor: "white",
        startingDay: true,
        endingDay: true,
      };
      console.log(markedDates);
      return markedDates;
    },
    {} as MarkedDates
  );

  const handleUpdateEntry = async (
    tempData: Array<{ title: string; value: string; isNumeric?: boolean }>
  ) => {
    console.log(tempData);
    setJournalData(tempData);
  };

  const handleSubmit = async () => {
    try {
      const service_id = servicesData?.find(
        (item) => item.service_name === journalEntry[0].value
      )?.service_id;

      await updateJournalEntry(journalEntry_id ?? "", {
        service_id: service_id,
        price: journalEntry[1].value,
        status: journalEntry[2].value,
      });
      setEditable(false);
    } catch (err) {
      console.log(err);
      setEditable(false);
    }
  };

  return (
    <View
      style={{
        backgroundColor: Colors.dark_green[500],
        display: "flex",
        flexGrow: 1,
      }}
    >
      <Stack.Screen
        options={{
          headerTitle: `JOURNAL ID: ${journalEntry_id}`,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#858cc7" },
          headerRight() {
            return (
              !editable && (
                <MaterialCommunityIcons
                  name={"square-edit-outline"}
                  size={24}
                  onPress={() => setEditable(!editable)}
                />
              )
            );
          },
        }}
      />
      <View style={styles.entryView}>
        <InfoContainer
          data={journalEntry}
          title="Entry Data"
          editable={editable}
          onUpdate={handleUpdateEntry}
        />

        {serviceDates ? (
          <Calendar
            style={{
              borderRadius: 5,
              marginVertical: 5,
              marginHorizontal: 20,
            }}
            theme={{
              calendarBackground: Colors.royal_blue[300],
              textDayFontWeight: "600",
              textMonthFontWeight: "600",
              textDayHeaderFontWeight: "600",
              dayTextColor: "black",
              textDisabledColor: "gray",
              monthTextColor: "black",
              textSectionTitleColor: "white",
              arrowColor: "white",
            }}
            disableAllTouchEventsForDisabledDays={true}
            markingType="period"
            markedDates={serviceDates}
            minDate={Object.keys(serviceDates)[0]}
            maxDate={
              Object.keys(serviceDates)[Object.keys(serviceDates).length - 1]
            }
            initialDate={Object.keys(serviceDates)[0]}
            hideArrows={true}
            hideExtraDays={true}
          />
        ) : (
          <View>
            <Text>Loading...</Text>
          </View>
        )}

        {editable && (
          <View style={{ display: "flex", flexDirection: "row" }}>
            <TouchableOpacity
              style={[styles.button, styles.submitButton]}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => {
                setEditable(false);
                refetchEntry();
                setJournalData([...tempJournalData]);
              }}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  entryView: {
    height: "100%",
  },
  entryTop: {
    display: "flex",
    flex: 1,
    flexGrow: 1,
    gap: 20,
    padding: 20,
  },
  entryText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  calendarStyle: {
    borderRadius: 5,
    margin: 12,
    elevation: -9999,
    borderWidth: 4,
    zIndex: -9999,
  },
  button: {
    padding: 10,
    marginHorizontal: 20,
    marginTop: 5,
    borderRadius: 5,
    flexGrow: 1,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: Colors.royal_blue[600],
  },
  cancelButton: {
    backgroundColor: Colors.error,
  },
});

export default JournalEntryScreen;
