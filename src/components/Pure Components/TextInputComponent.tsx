import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

const TextInputComponent = ({
  value,
  onValueChange,
  ...props
}: {
  value: string;
  onValueChange: (value: string) => void;
  [key: string]: any; // Allow additional props
}) => {
  return (
    <TextInput
      style={[styles.infoText, styles.editableTextInput, { width: "100%" }]}
      value={value}
      onChangeText={onValueChange}
      {...props} // Spread additional props
    />
  );
};

export default TextInputComponent;

const styles = StyleSheet.create({
  infoText: {
    color: "black",
    fontSize: 20,
    fontWeight: "500",
    marginHorizontal: 15,
    paddingVertical: 15,
  },
  editableTextInput: {
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
  },
});
