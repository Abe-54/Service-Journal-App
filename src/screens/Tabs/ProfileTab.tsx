import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { readString } from "react-native-csv";
import { createNewClient, getUser } from "../../api";
import CustomButton from "../../components/CustomButton";
import Colors from "../../constants/Colors";
import useAuthStore from "../../stores/AuthStore";
import useUserStore from "../../stores/UserStore";

const ProfileTab = () => {
  const [user, setUser] = useState({ company_name: "" });
  const { getUserId } = useUserStore((state) => ({
    getUserId: state.userId,
  }));
  const { signOut } = useAuthStore((state) => ({ signOut: state.signout }));
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const id = await getUserId();
      const user = await getUser(id ?? "NO ID FOUND");
      setUser(user);
    };
    fetchUser();
  }, []);

  const handleLogOut = async () => {
    await signOut();
    router.replace("/sign-in");
    console.log("LOGGED OUT");
  };

  const handleImportClients = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: ["text/csv", "text/comma-separated-values"],
        copyToCacheDirectory: true,
      });

      const customersCSV = res.assets?.[0];

      if (res.canceled || !customersCSV) {
        Alert.alert("Canceled from selecting file");
        console.log("cancelled");
        return null;
      }

      console.log("Selected file name:", customersCSV.name);
      console.log(`Selected file size: ${customersCSV.size} bytes`);
      console.log(`Selected file uri: ${customersCSV.uri}`);
      console.log(`Selected file mime type: ${customersCSV.mimeType}`);

      const fileData = await FileSystem.readAsStringAsync(customersCSV.uri);
      const parsedData = readString(fileData, { header: true });

      if (!parsedData.data || !parsedData.data.length) {
        console.log("Invalid file format");
        return;
      }

      console.log(parsedData.data);

      const id = await getUserId();

      const promises = parsedData.data.map(async (client: any) => {
        const result = await createNewClient(
          id ?? "NO ID FOUND",
          client.Customer,
          parseInt(client.HouseNumber),
          client.Street,
          client.City
        );
        console.log(result);
        return result;
      });

      const results = await Promise.all(promises);
      console.log(results);
    } catch (err) {
      Alert.alert("Error", "Failed to import clients. Please try again.");
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.profileInfo}>
        <Text style={styles.profileText}>
          Company: {user ? user.company_name : ""}
        </Text>
        <View style={styles.buttonsView}>
          <CustomButton style={[styles.profileButton]} onPress={handleLogOut}>
            <Text style={styles.profileLogOutText}>Log Out</Text>
          </CustomButton>
          <CustomButton
            style={[styles.profileButton]}
            onPress={handleImportClients}
          >
            <Text style={styles.profileLogOutText}>Import Clients</Text>
          </CustomButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.dark_green[500],
    display: "flex",
    flexGrow: 1,
  },
  profileInfo: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 50,
  },
  profileText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  profileButton: {
    display: "flex",
    alignSelf: "stretch",
    paddingVertical: 10,
    borderRadius: 15,
    elevation: 5,
  },
  profileLogOutText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonsView: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "space-between",
    alignSelf: "stretch",
    margin: 50,
  },
});

export default ProfileTab;
