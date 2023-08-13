import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import CustomButton from "../../components/CustomButton";
import RadioButton from "../../components/RadioButton";
import StageIndicator from "../../components/StageIndicator";
import Colors from "../../constants/Colors";

const EnterDetails = () => {
  const [selectedRadioButton, setSelectedRadioButton] = useState(
    null as number | null
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [entryDate, setEntryDate] = useState(new Date());

  const [priceInput, setPriceInput] = useState("");
  const [price, setPrice] = useState(0);

  const [description, setDescription] = useState("");
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);

  const handleRadioButtonPress = (buttonIndex: number) => {
    setSelectedRadioButton(buttonIndex);
    console.log("Pressed " + buttonIndex);
  };

  const isValidMoneyInput = (input: string) => {
    // Regular expression to match valid money format with optional digits after the decimal point
    const moneyPattern = /^\d+(\.\d*)?$/;
    return moneyPattern.test(input);
  };

  const formatMoney = (input: string) => {
    const numericValue = parseFloat(input.replace(/[^\d.]/g, ""));
    return isNaN(numericValue)
      ? ""
      : numericValue.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
  };

  const handlePriceChange = (text: string) => {
    const unformattedPrice = text.replace(/[^\d.]/g, ""); // Remove non-numeric characters
    setPrice(unformattedPrice === "" ? 0 : parseFloat(unformattedPrice));
    setPriceInput(text);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <Text style={styles.entryDateTitle}>Select Status:</Text>
        <View style={styles.statusButtonsView}>
          <RadioButton
            selected={selectedRadioButton === 0}
            onPress={() => handleRadioButtonPress(0)}
            label="Not Started"
          />
          <RadioButton
            selected={selectedRadioButton === 1}
            onPress={() => handleRadioButtonPress(1)}
            label="In Progress"
          />
          <RadioButton
            selected={selectedRadioButton === 2}
            onPress={() => handleRadioButtonPress(2)}
            label="Completed"
          />
        </View>
      </View>

      <View>
        <Text style={styles.entryDateTitle}>Entry Date:</Text>

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
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Text
          style={styles.entryDateInput}
          onPress={() => setShowDatePicker(true)}
        >
          {entryDate.toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            timeZone: "UTC",
          })}
        </Text>
      </View>

      <View>
        <Text style={styles.entryDateTitle}>Service Price:</Text>
        <TextInput
          style={styles.priceTextInput}
          value={priceInput}
          inputMode="numeric"
          keyboardType="numeric"
          onFocus={() => {
            setPriceInput(price.toFixed(2));
          }}
          onChangeText={(text) => handlePriceChange(text)}
          onBlur={() => {
            if (isValidMoneyInput(priceInput)) {
              const formattedPrice = formatMoney(priceInput);
              setPriceInput(formattedPrice);
            }
          }}
        />
      </View>

      <View>
        <View>
          <Text style={styles.entryDateTitle}>Description:</Text>
          <Modal
            visible={showDescriptionModal}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowDescriptionModal(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalBackdrop} />
              <View style={styles.modalContent}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 24,
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  Description:
                </Text>
                <TextInput
                  style={{
                    backgroundColor: "white",
                    fontSize: 16,
                    borderRadius: 10,
                    padding: 15,
                    color: "black",
                    fontWeight: "600",
                    height: "80%",
                    textAlignVertical: "top",
                  }}
                  value={description}
                  onChangeText={(text) => setDescription(text)}
                  multiline={true}
                  onFocus={() => setShowDescriptionModal(true)}
                  onBlur={() => setShowDescriptionModal(false)}
                />
                <CustomButton
                  style={[
                    styles.modalCloseButton,
                    { display: description ? "flex" : "none" },
                  ]}
                  onPress={() => setShowDescriptionModal(false)}
                >
                  <Text style={styles.modalCloseButtonText}>Close</Text>
                </CustomButton>
              </View>
            </View>
          </Modal>

          <Text
            style={styles.descriptionTextInput}
            onPress={() => setShowDescriptionModal(true)}
          >
            {description}
          </Text>
        </View>
      </View>

      <View>
        <CustomButton
          variant="light_blue"
          style={{ marginHorizontal: 10, padding: 10, borderRadius: 100 }}
          onPress={() => {
            console.log("Pressed");
          }}
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
      </View>

      <StageIndicator currentStage={3} totalStages={4} />
    </SafeAreaView>
  );
};

export default EnterDetails;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.dark_green[500],
    height: "100%",
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    padding: 15,
  },
  statusButtonsView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  entryDateTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    marginHorizontal: 15,
    padding: 15,
  },
  entryDateInput: {
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 30,
    padding: 15,
    color: "black",
    fontWeight: "600",
  },
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
  pressedBackdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Adjust the color to your preference
  },
  modalContent: {
    backgroundColor: Colors.dark_green[500],
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxHeight: "80%",
  },
  priceTextInput: {
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 30,
    padding: 15,
    color: "black",
    fontWeight: "600",
  },
  descriptionTextInput: {
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 30,
    marginBottom: 30,
    padding: 15,
    color: "black",
    fontWeight: "600",
    height: 150,
    textAlignVertical: "top",
  },
  modalCloseButton: {
    borderRadius: 10,
    marginHorizontal: 30,
    padding: 15,
    // marginTop: 15,
  },
  modalCloseButtonText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginHorizontal: 30,
    marginTop: 5,
  },
});
