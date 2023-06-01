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
import Colors from "../constants/Colors";
import DropdownComponent from "./Pure Components/DropdownComponent";
import TextInputComponent from "./Pure Components/TextInputComponent";

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

  const renderInputComponent = (item: {
    title: string;
    value: string;
    isNumeric?: boolean;
    isCurrency?: boolean;
    type?: "text" | "dropdown";
    options?: string[];
  }) => {
    const type = item.type || "text";

    switch (type) {
      case "dropdown":
        return <DropdownComponent />;
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
    <View>
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
              },
            ]}
          >
            <Text style={styles.infoTitle}>{item.title}:</Text>
            <View
              style={[
                styles.infoContainerCol,
                {
                  backgroundColor:
                    index % 2 === 0
                      ? Colors.royal_blue[200]
                      : Colors.royal_blue[100],
                },
              ]}
            >
              {editable ? (
                renderInputComponent(item)
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
    overflow: "hidden",
    borderRadius: 10,
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
  editButton: {
    // width: "100%",
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
