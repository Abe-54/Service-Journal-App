import React from "react";
import { StyleSheet, View } from "react-native";
import DropDownPicker, {
  DropDownPickerProps,
} from "react-native-dropdown-picker";

type DropdownPickerProps = DropDownPickerProps<string> & {
  value: string;
  items: Array<{ label: string; value: string }>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  customStyle?: object;
};

const DropdownPickerComponent = ({
  value,
  items,
  open,
  setOpen,
  setValue,
  customStyle,
}: DropdownPickerProps) => {
  return (
    <View style={[styles.container, customStyle]}>
      <DropDownPicker
        value={value}
        items={items}
        open={open}
        setOpen={setOpen}
        setValue={setValue}
        labelStyle={styles.dropdownLabel}
        containerStyle={styles.dropdownContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  dropdownContainer: {
    marginHorizontal: 15,
  },
  dropdown: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
  },
  dropdownLabel: {
    fontSize: 16,
    color: "black",
  },
});

export default DropdownPickerComponent;
