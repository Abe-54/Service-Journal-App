import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { Direction, MarkedDates } from "react-native-calendars/src/types";
import { getJournalEntry } from "../api";
import InfoContainer from "../components/InfoContainer";
import Colors from "../constants/Colors";
import { JournalEntry } from "../interfaces/JournalEntry";

const JournalEntryScreen = () => {
  const { journalEntry_id, client_id } = useLocalSearchParams<{
    journalEntry_id: string;
    client_id?: string;
  }>();
  const [entry, setEntry] = useState<JournalEntry>();

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

  const journalData = [
    { title: "Service", value: entry?.service ?? "No Service" },
    {
      title: "Price",
      value: "$" + parseFloat(entry?.price || "0").toFixed(2) ?? "No Price",
    },
    { title: "Status", value: entry?.status ?? "No Status" },
  ];

  const serviceDates = entry?.serviceDates.reduce((dates, date) => {
    const formattedDate = new Date(date.service_date);
    dates[formattedDate.toISOString().slice(0, 10)] = {
      color: Colors.royal_blue[500],
      textColor: "white",
      startingDay: true,
      endingDay: true,
    };
    console.log(dates);
    return dates;
  }, {} as MarkedDates);

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
        }}
      />
      <View style={styles.entryView}>
        <InfoContainer
          data={journalData}
          title="Entry Data"
          editable={true}
          onUpdate={(data) => {
            console.log(data);
          }}
        />
        <Calendar
          style={{
            borderRadius: 5,
            margin: 12,
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
          minDate={serviceDates ? Object.keys(serviceDates)[0] : undefined}
          maxDate={
            serviceDates
              ? Object.keys(serviceDates)[Object.keys(serviceDates).length - 1]
              : undefined
          }
          hideArrows={true}
          hideExtraDays={true}
        />
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
    elevation: 5,
    borderWidth: 4,
  },
});

export default JournalEntryScreen;
