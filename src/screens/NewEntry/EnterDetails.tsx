import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import CustomButton from "../../components/CustomButton";
import CalendarModal from "../../components/Modals/CalendarModal";
import DescriptionModal from "../../components/Modals/DescriptionModal";
import PriceInput from "../../components/PriceInput";
import RadioButton from "../../components/RadioButton";
import StageIndicator from "../../components/StageIndicator";
import Colors from "../../constants/Colors";
import useNewEntryStore from "../../stores/NewEntryStore";

const EnterDetails = () => {
  const {
    entryStatus,
    setEntryStatus,
    entryDate,
    setEntryDate,
    entryPrice,
    setEntryPrice,
    entryDescription,
    setEntryDescription,
  } = useNewEntryStore();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [priceInput, setPriceInput] = useState("");
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [stageCompleted, setStageCompleted] = useState(false);

  useEffect(() => {
    if (entryDate && entryStatus !== "" && entryPrice !== 0) {
      setStageCompleted(true);
    } else {
      setStageCompleted(false);
    }
  }, [entryDate, entryStatus, entryPrice]);

  const handleRadioButtonPress = (buttonLabel: string) => {
    setEntryStatus(buttonLabel);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={[styles.entryDateTitle, { paddingRight: 0, marginRight: 0 }]}
          >
            Select Status:
          </Text>
          <Text style={styles.entrySubTitle}>(required)</Text>
        </View>
        <View style={styles.statusButtonsView}>
          <RadioButton
            selected={entryStatus === "Not Started"}
            onPress={() => handleRadioButtonPress("Not Started")}
            label="Not Started"
          />
          <RadioButton
            selected={entryStatus === "In Progress"}
            onPress={() => handleRadioButtonPress("In Progress")}
            label="In Progress"
          />
          <RadioButton
            selected={entryStatus === "Completed"}
            onPress={() => handleRadioButtonPress("Completed")}
            label="Completed"
          />
        </View>
      </View>

      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={[styles.entryDateTitle, { paddingRight: 0, marginRight: 0 }]}
          >
            Entry Date:
          </Text>
          <Text style={styles.entrySubTitle}>(required)</Text>
        </View>
        <Text
          style={styles.entryDateInput}
          onPress={() => setShowDatePicker(true)}
        >
          {entryDate?.toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            timeZone: "UTC",
          })}
        </Text>
        <CalendarModal
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          entryDate={entryDate ?? new Date(Date.now())}
          setEntryDate={setEntryDate}
        />
      </View>

      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={[styles.entryDateTitle, { paddingRight: 0, marginRight: 0 }]}
          >
            Service Price:
          </Text>
          <Text style={styles.entrySubTitle}>(required)</Text>
        </View>
        <PriceInput
          priceInput={priceInput}
          setPriceInput={setPriceInput}
          price={entryPrice ?? 0}
          setPrice={setEntryPrice}
        />
      </View>

      <View>
        <ScrollView>
          <View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[
                  styles.entryDateTitle,
                  { paddingRight: 0, marginRight: 0 },
                ]}
              >
                Description:
              </Text>
              <Text style={styles.entrySubTitle}>(optional)</Text>
            </View>

            <DescriptionModal
              showDescriptionModal={showDescriptionModal}
              setShowDescriptionModal={setShowDescriptionModal}
              description={entryDescription ?? ""}
              setDescription={setEntryDescription}
            />

            <Text
              style={[
                styles.descriptionTextInput,
                { color: entryDescription ? "black" : "gray" },
              ]}
              onPress={() => setShowDescriptionModal(true)}
            >
              {entryDescription || "Enter a description..."}
            </Text>
          </View>
        </ScrollView>
      </View>

      <View>
        <Link href="/confirmEntry" asChild>
          <CustomButton
            variant={stageCompleted ? "light_blue" : "disabled"}
            style={{ marginHorizontal: 10, padding: 10, borderRadius: 100 }}
            onPress={() => {
              console.log("Pressed");
            }}
            disabled={!stageCompleted}
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
        </Link>
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
  entrySubTitle: {
    fontSize: 12,
    fontStyle: "italic",
    color: "white",
    marginTop: 10,
    marginRight: 36,
  },
  entryDateInput: {
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
  errorText: {
    color: "red",
    fontSize: 14,
    marginHorizontal: 30,
    marginTop: 5,
  },
});
