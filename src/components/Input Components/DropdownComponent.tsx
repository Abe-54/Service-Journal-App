import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Colors from "../../constants/Colors";

interface DropdownComponentProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  data: Array<{ label: string; value: string }>;
  placeholder: string;
  searchPlaceholder?: string;
  renderLeftIcon?: () => JSX.Element;
  customStyles?: {
    container?: object;
    labelText?: object;
    dropdownListContainer?: object;
    dropdown?: object;
    icon?: object;
    placeholderStyle?: object;
    selectedTextStyle?: object;
    iconStyle?: object;
    inputSearchStyle?: object;
  };
  activeColor?: string;
  canSearch?: boolean;
}

const DropdownComponent = ({
  label,
  value,
  onChange,
  data,
  placeholder,
  searchPlaceholder,
  renderLeftIcon,
  customStyles,
  activeColor,
  canSearch = true,
}: DropdownComponentProps) => {
  const [isFocus, setIsFocus] = useState(false);

  const defaultRenderLeftIcon = () => (
    <AntDesign
      style={[styles.icon, customStyles?.icon]}
      color={isFocus ? "blue" : "black"}
      name="user"
      size={20}
    />
  );

  const leftIcon = renderLeftIcon ? renderLeftIcon() : defaultRenderLeftIcon();

  const mergedStyles = { ...styles, ...customStyles };

  return (
    <View style={mergedStyles.container}>
      <Text style={mergedStyles.labelText}>{label}:</Text>
      <Dropdown
        style={[mergedStyles.dropdown]}
        containerStyle={mergedStyles.dropdownListContainer}
        placeholderStyle={mergedStyles.placeholderStyle}
        selectedTextStyle={mergedStyles.selectedTextStyle}
        inputSearchStyle={mergedStyles.inputSearchStyle}
        iconStyle={mergedStyles.iconStyle}
        activeColor={activeColor ? activeColor : Colors.royal_blue[100]}
        data={data}
        search={canSearch}
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        searchPlaceholder={canSearch ? searchPlaceholder : ""}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onChange(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => leftIcon}
      />
    </View>
  );
};

const styles = {
  container: {
    borderRadius: 8,
    display: "flex",
    marginHorizontal: 20,
    rowGap: 5,
  },
  labelText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  dropdownListContainer: {
    borderRadius: 8,
    backgroundColor: Colors.royal_blue[300],
  },
  dropdown: {
    paddingVertical: 8,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: Colors.royal_blue[300],
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderRadius: 8,
    backgroundColor: "white",
  },
};

export default DropdownComponent;
