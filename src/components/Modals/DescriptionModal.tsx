import React from "react";
import { Modal, StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../../constants/Colors";
import CustomButton from "../CustomButton";

type DescriptionModalProps = {
  showDescriptionModal: boolean;
  setShowDescriptionModal: (show: boolean) => void;
  description: string;
  setDescription: (description: string) => void;
};

const DescriptionModal = ({
  showDescriptionModal,
  setShowDescriptionModal,
  description,
  setDescription,
}: DescriptionModalProps) => {
  return (
    <Modal
      visible={showDescriptionModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowDescriptionModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalBackdrop} />
        <View
          style={[
            styles.modalContent,
            { backgroundColor: Colors.dark_green[500] },
          ]}
        >
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
              marginBottom: 15,
              padding: 15,
              color: "black",
              fontWeight: "600",
              height: 200,
              textAlignVertical: "top",
            }}
            value={description}
            onChangeText={(text) => setDescription(text)}
            multiline={true}
            onFocus={() => setShowDescriptionModal(true)}
            onBlur={() => setShowDescriptionModal(false)}
          />
          <CustomButton
            style={styles.modalCloseButton}
            onPress={() => setShowDescriptionModal(false)}
          >
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </CustomButton>
        </View>
      </View>
    </Modal>
  );
};

export default DescriptionModal;

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
  modalCloseButton: {
    borderRadius: 10,
    marginHorizontal: 30,
    padding: 15,
  },
  modalCloseButtonText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
});
