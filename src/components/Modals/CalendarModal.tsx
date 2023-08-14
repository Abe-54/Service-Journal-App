import React from "react";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import Colors from "../../constants/Colors";

type CalendarModalProps = {
  showDatePicker: boolean;
  setShowDatePicker: (show: boolean) => void;
  entryDate: Date;
  setEntryDate: (date: Date) => void;
};

const CalendarModal = ({
  showDatePicker,
  setShowDatePicker,
  entryDate,
  setEntryDate,
}: CalendarModalProps) => {
  return (
    <Modal
      visible={showDatePicker}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowDatePicker(false)}
    >
      <TouchableWithoutFeedback onPress={() => setShowDatePicker(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalBackdrop} />
          <View style={styles.modalContent}>
            <Calendar
              onDayPress={(day) => {
                const selectedDate = new Date(day.dateString);
                console.log("Selected day:", selectedDate);
                setEntryDate(selectedDate);
                setShowDatePicker(false);
              }}
              onMonthChange={(month) => {
                console.log("month changed", month);
              }}
              hideExtraDays={true}
              firstDay={1}
              style={{
                borderRadius: 15,
                padding: 10,
                overflow: "hidden",
              }}
              markedDates={{
                [entryDate.toISOString().slice(0, 10)]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedColor: Colors.error,
                },
              }}
              theme={{
                backgroundColor: Colors.dark_green[500],
                calendarBackground: Colors.dark_green[500],
                textSectionTitleColor: "#ffffff",
                textSectionTitleDisabledColor: "#ffffff",
                selectedDayBackgroundColor: "#00adf5",
                selectedDayTextColor: "#ffffff",
                todayTextColor: "#ffffff",
                dayTextColor: "#ffffff",
                textDisabledColor: "#ffffff",
                dotColor: "#00adf5",
                selectedDotColor: "#ffffff",
                arrowColor: "orange",
                disabledArrowColor: "#ffffff",
                monthTextColor: "#ffffff",
                indicatorColor: "#ffffff",
                textDayFontFamily: "monospace",
                textMonthFontFamily: "monospace",
                textDayHeaderFontFamily: "monospace",
                textDayFontWeight: "bold",
                textMonthFontWeight: "bold",
                textDayHeaderFontWeight: "bold",
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16,
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    opacity: 0.5,
  },
  modalContent: {
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxHeight: "80%",
  },
});

export default CalendarModal;
