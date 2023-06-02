import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface TextInputComponentProps extends TextInputProps {
  value: string;
  onValueChange: (value: string) => void;
  [key: string]: any;
}

const TextInputComponent = ({
  value,
  onValueChange,
  ...props
}: TextInputComponentProps) => {
  return (
    <TextInput
      style={[styles.infoText, styles.editableTextInput]}
      value={value}
      onChangeText={onValueChange}
      {...props}
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
    width: "100%",
  },
});
