import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
  StyleProp,
} from "react-native";

interface TextInputComponentProps extends TextInputProps {
  value?: string;
  onValueChange?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
}

const TextInputComponent = ({
  value,
  onValueChange,
  style,
  ...props
}: TextInputComponentProps) => {
  return (
    <TextInput
      style={[styles.editableTextInput, style]}
      value={value}
      onChangeText={onValueChange}
      placeholderTextColor={"gray"}
      {...props}
    />
  );
};

export default TextInputComponent;

const styles = StyleSheet.create({
  editableTextInput: {
    color: "black",
    fontSize: 16,
    fontWeight: "500",
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    width: "100%",
  },
});
