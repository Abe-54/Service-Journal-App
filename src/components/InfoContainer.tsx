import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Colors from "../constants/Colors";
import {
  default as DropdownComponent,
  default as DropdownPickerComponent,
} from "./Input Components/DropdownComponent";
import TextInputComponent from "./Input Components/TextInputComponent";

interface InfoContainerProps {
  data: Array<{
    title: string;
    value: string;
    isNumeric?: boolean;
    isCurrency?: boolean;
    type?: "text" | "dropdown";
    options?: string[];
  }>;
  title: string;
  editable?: boolean;
  onUpdate: (
    updatedData: Array<{
      title: string;
      value: string;
      isNumeric?: boolean;
      isCurrency?: boolean;
    }>
  ) => void;
}

const InfoContainer = ({
  data,
  title,
  editable = false,
  onUpdate,
}: InfoContainerProps) => {
  const [textInputValue, setTextInputValue] = useState<string>("");
  const [openDropdowns, setOpenDropdowns] = useState<number[]>([]);

  const renderInputComponent = (
    item: {
      title: string;
      value: string;
      isNumeric?: boolean;
      isCurrency?: boolean;
      type?: "text" | "dropdown";
      options?: string[];
    },
    itemIndex: number
  ) => {
    const type = item.type || "text";
    // console.log("ITEM: " + item.value);

    switch (type) {
      case "dropdown":
        const dropdownOptions = item.options?.map((option) => ({
          label: option,
          value: option,
        }));

        return (
          <DropdownPickerComponent
            value={item.value}
            items={dropdownOptions || []}
            open={openDropdowns.includes(itemIndex)}
            setOpen={() => {
              if (openDropdowns.includes(itemIndex)) {
                setOpenDropdowns(
                  openDropdowns.filter((index) => index !== itemIndex)
                );
              } else {
                setOpenDropdowns([itemIndex]); // Open the dropdown and close others
              }
            }}
            setValue={(newValue) => {
              const updatedData = data.map((item, index) => {
                if (index === itemIndex) {
                  return {
                    ...item,
                    value:
                      typeof newValue === "function"
                        ? newValue(item.value)
                        : newValue,
                  };
                }
                return item;
              });
              onUpdate(updatedData);
            }}
          />
        );
      case "text":
      default:
        return (
          <TextInputComponent
            value={textInputValue}
            onValueChange={(text) => {
              setTextInputValue(text);
            }}
            placeholder={item.value}
            numberOfLines={1}
            onChangeText={(text: React.SetStateAction<string>) =>
              setTextInputValue(text)
            }
            keyboardType={item.isNumeric ? "numeric" : "default"}
          />
        );
    }
  };

  return (
    <View style={{ zIndex: 1 }}>
      <Text style={styles.infoContainerTitle}>{title}</Text>
      <View style={styles.infoContainer}>
        {data.map((item, index) => (
          <View
            key={index}
            style={[
              styles.infoContainerRow,
              {
                backgroundColor:
                  index % 2 === 0
                    ? Colors.royal_blue[200]
                    : Colors.royal_blue[100],
                zIndex: data.length - index,
                borderTopLeftRadius: index === 0 ? 10 : 0,
                borderTopRightRadius: index === 0 ? 10 : 0,
                borderBottomLeftRadius: index === data.length - 1 ? 10 : 0,
                borderBottomRightRadius: index === data.length - 1 ? 10 : 0,
              },
            ]}
          >
            <Text style={styles.infoTitle}>{item.title}:</Text>
            <View style={[styles.infoContainerCol]}>
              {editable ? (
                renderInputComponent(item, index)
              ) : (
                <Text
                  style={styles.infoText}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  selectable={true}
                >
                  {item.isNumeric && (item.isCurrency || false)
                    ? `$${parseFloat(item.value).toFixed(2)}`
                    : item.value}
                </Text>
              )}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainerTitle: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    fontWeight: "600",
    marginTop: 10,
  },
  infoContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    // overflow: "hidden",
  },
  infoContainerRow: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "row",
  },
  infoContainerCol: {
    display: "flex",
    flex: 1,
    flexGrow: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 30,
  },
  infoTitle: {
    paddingLeft: 15,
    paddingVertical: 20,
    color: "black",
    fontSize: 20,
    fontWeight: "500",
    flex: 1 / 10,
    minWidth: 100,
    borderRightWidth: 3,
    borderColor: Colors.royal_blue[500],
  },
  confirmButton: {
    backgroundColor: Colors.dark_green[100], // Customize the button styles
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  infoText: {
    color: "black",
    fontSize: 20,
    fontWeight: "500",
    marginHorizontal: 15,
    paddingVertical: 15,
  },
});

export default InfoContainer;
