import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { getUser } from "../../api";
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.profileInfo}>
        <Text style={styles.profileText}>{user ? user.company_name : ""}</Text>
      </View>
      <CustomButton style={styles.profileLogOutButton} onPress={handleLogOut}>
        <Text style={styles.profileLogOutText}>Log Out</Text>
      </CustomButton>
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
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 100,
  },
  profileText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  profileLogOutButton: {
    display: "flex",
    alignSelf: "stretch",
    padding: 10,
    margin: 50,
    borderRadius: 15,
    elevation: 5,
  },
  profileLogOutText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default ProfileTab;
