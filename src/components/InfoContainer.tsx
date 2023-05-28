import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../constants/Colors";

interface InfoContainerProps {
  data: Array<{ title: string; value: string }>;
  title: string;
  editable?: boolean;
  onUpdate: (updatedData: Array<{ title: string; value: string }>) => void;
}

const InfoContainer = ({
  data,
  title,
  editable = false,
  onUpdate,
}: InfoContainerProps) => {
  const [updatedData, setUpdatedData] = useState(data);
  const [editableIndex, setEditableIndex] = useState<number>(-1);

  const handleValueChange = (index: number, value: string) => {
    const newData = [...updatedData];
    newData[index].value = value;
    setUpdatedData(newData);
  };

  const handleToggleEdit = (index: number) => {
    if (editableIndex === index) {
      setEditableIndex(-1);
      if (editableIndex !== -1) {
        handleConfirmChanges();
      }
    } else {
      setEditableIndex(index);
    }
  };

  const handleConfirmChanges = () => {
    onUpdate(updatedData);
  };

  const getTextInputWidth = (placeholder: string) => {
    const minWidth = 100;
    const width = placeholder.length * 10 + 30;
    return Math.max(width, minWidth);
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
              {editable && editableIndex === index ? (
                <TextInput
                  style={[
                    styles.infoText,
                    styles.editableTextInput,
                    { width: getTextInputWidth(item.value) },
                  ]}
                  placeholder={item.value}
                  onChangeText={(value) => handleValueChange(index, value)}
                  autoFocus={true}
                />
              ) : (
                <View>
                  <Text
                    style={styles.infoText}
                    adjustsFontSizeToFit={true}
                    minimumFontScale={0.5}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.value}
                  </Text>
                </View>
              )}
              {editable && (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleToggleEdit(index)}
                >
                  <MaterialCommunityIcons
                    name={
                      editableIndex === index
                        ? "checkbox-outline"
                        : "square-edit-outline"
                    }
                    size={24}
                    color={editableIndex === index ? "green" : "tomato"}
                  />
                </TouchableOpacity>
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
    marginTop: 20,
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
  infoText: {
    color: "black",
    fontSize: 20,
    fontWeight: "500",
    marginHorizontal: 15,
    paddingVertical: 15,
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
    width: "min-content",
  },
  editableTextInput: {
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
  },
});

export default InfoContainer;
