import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar, CalendarProvider } from "react-native-calendars";
import { Direction, MarkedDates } from "react-native-calendars/src/types";
import {
  getAllServices,
  getJournalEntry,
  getServiceById,
  getServiceByName,
  updateJournalEntry,
} from "../api";
import InfoContainer from "../components/InfoContainer";
import Colors from "../constants/Colors";
import { JournalEntry } from "../interfaces/JournalEntry";
import { Service } from "../interfaces/Service";

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
  const [entry, setEntry] = useState<JournalEntry>();
  const [editable, setEditable] = useState<boolean>(false);
  const [journalEntry, setJournalData] = useState([...initialJournalEntry]);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchEntry = async () => {
      if (journalEntry_id && client_id) {
        const fetchedEntry: JournalEntry = await getJournalEntry(
          "1",
          client_id,
          journalEntry_id
        );
        setEntry(fetchedEntry);
      }
    };

    fetchEntry();
  }, [journalEntry_id, client_id]);

  useEffect(() => {
    const fetchServices = async () => {
      const fetchedServices: Service[] = await getAllServices("1");
      setServices(fetchedServices);
    };
    fetchServices();
  }, ["1"]);

  useEffect(() => {
    if (entry) {
      setJournalData([
        {
          title: "Service",
          value: entry.Service.service_name,
          type: "dropdown",
          options: services.map((service) => service.service_name) || [],
        },
        {
          title: "Price",
          value: entry.price || "0",
          isNumeric: true,
          isCurrency: true,
        },
        {
          title: "Status",
          value: entry.status,
          type: "dropdown",
          options: ["Not Started", "In Progress", "Completed"],
        },
      ]);
    }
  }, [entry]);

  const serviceDates = entry?.serviceDates.reduce(
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
      const service_id = services.find(
        (item) => item.service_name === journalEntry[0].value
      )?.service_id;

      const updateEntry = await updateJournalEntry(journalEntry_id ?? "", {
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
              onPress={() => setEditable(false)}
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
