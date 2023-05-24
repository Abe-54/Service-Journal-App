import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Client } from "../../src/interfaces/Client";
import Colors from "../constants/Colors";

interface InfoContainerProps {
  client: Client;
}

const InfoContainer = ({ client }: InfoContainerProps) => {
  return (
    <View>
      <Text style={styles.infoContainerTitle}>Client Information</Text>
      <View style={styles.infoContainer}>
        <View
          style={[
            styles.infoContainerRow,
            { backgroundColor: Colors.royal_blue[200] },
          ]}
        >
          <Text style={styles.infoTitle}>City:</Text>
          <View
            style={[
              styles.infoContainerCol,
              { backgroundColor: Colors.royal_blue[200] },
            ]}
          >
            <Text style={styles.infoText}>{client.city}</Text>
          </View>
        </View>
        <View
          style={[
            styles.infoContainerRow,
            { backgroundColor: Colors.royal_blue[100] },
          ]}
        >
          <Text style={styles.infoTitle}>Street:</Text>
          <View
            style={[
              styles.infoContainerCol,
              { backgroundColor: Colors.royal_blue[100] },
            ]}
          >
            <Text style={styles.infoText}>{client.street}</Text>
          </View>
        </View>
        <View
          style={[
            styles.infoContainerRow,
            { backgroundColor: Colors.royal_blue[200] },
          ]}
        >
          <Text style={styles.infoTitle}>House:</Text>
          <View
            style={[
              styles.infoContainerCol,
              { backgroundColor: Colors.royal_blue[200] },
            ]}
          >
            <Text style={styles.infoText}>{client.house_number}</Text>
          </View>
        </View>
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
    flexDirection: "row",
  },
  infoContainerCol: {
    width: "100%",
    flex: 1,
  },
  infoTitle: {
    paddingLeft: 15,
    paddingVertical: 20,
    color: "black",
    fontSize: 24,
    fontWeight: "500",
    flex: 1 / 10,
    minWidth: 100,
    borderRightWidth: 3,
    borderColor: Colors.royal_blue[500],
  },
  infoText: {
    color: "black",
    fontSize: 24,
    fontWeight: "500",
    flex: 1,
    marginLeft: 15,
    paddingVertical: 20,
  },
});

export default InfoContainer;
