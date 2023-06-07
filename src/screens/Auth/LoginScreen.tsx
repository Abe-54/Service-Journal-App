import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import TextInputComponent from "../../components/Input Components/TextInputComponent";
import CustomButton from "../../components/CustomButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import GoogleIcon from "../../components/Custom SVGs/GoogleIcon";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Perform login logic here
  };

  return (
    <View
      style={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        backgroundColor: Colors.dark_green[100],
      }}
    >
      <View style={styles.logoView}>
        <Text style={[styles.logoText, { fontWeight: "400" }]}>
          Welcome to your
        </Text>
        <Text style={[styles.logoText, { fontWeight: "600" }]}>
          Service Journal
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.socialMediaButtonsContainer}>
            <CustomButton
              style={styles.socialMediaButton}
              onPress={() => {}}
              customColors={{
                defaultColor: "#4285F4",
                pressedColor: "#3b78dc",
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 100,
                  padding: 4,
                  margin: 4,
                }}
              >
                <GoogleIcon width={20} height={20} />
              </View>

              <Text style={styles.socialMediaButtonText}>
                Continue with Google
              </Text>
            </CustomButton>
          </View>
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <View style={styles.dividerTextView}>
              <Text style={styles.dividerText}>or continue with email</Text>
            </View>
          </View>
          <View style={styles.textInputView}>
            <Text style={styles.textInputTitle}>Email</Text>
            <TextInputComponent
              style={styles.editableTextInput}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="Required"
              textContentType="emailAddress"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.textInputView}>
            <Text style={styles.textInputTitle}>Password</Text>
            <TextInputComponent
              style={styles.editableTextInput}
              onChangeText={(text) => setPassword(text)}
              value={password}
              placeholder="At least 8 characters"
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              textContentType="newPassword"
              onValueChange={(text) => setPassword(text)}
            />
          </View>
          <CustomButton
            style={styles.loginButton}
            onPress={handleLogin}
            customColors={{
              defaultColor: "#a8e26a",
              pressedColor: Colors.dark_green[500],
            }}
          >
            <Text style={styles.buttonText}> SIGN IN </Text>
          </CustomButton>
          <View style={styles.loginLinkContainer}>
            <Text style={styles.loginText}>Already a user? </Text>
            <Text style={styles.loginLink}>LOGIN</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#f8fcf2",
    padding: 20,
    margin: 20,
    borderRadius: 12,
    elevation: 5,
  },
  logoView: {
    alignSelf: "flex-start",
    marginLeft: 20,
  },
  logoText: {
    textAlign: "left",
    fontSize: 30,
    fontWeight: "600",
    color: "white",
  },
  inputContainer: {
    margin: 0,
  },
  textInputView: {
    flexDirection: "column",
    width: "100%",
    marginVertical: 10,
  },
  textInputTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  editableTextInput: {
    marginVertical: 5,
    borderWidth: 0,
    backgroundColor: "gainsboro",
    borderRadius: 8,
  },
  loginButton: {
    marginVertical: 15,
    padding: 10,
    borderRadius: 100,
    alignItems: "center",
    elevation: 5,
  },
  buttonText: {
    color: "#f8fcf2",
    fontSize: 20,
    fontWeight: "600",
  },
  dividerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  divider: {
    height: 3,
    width: "100%",
    backgroundColor: "darkgray",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    position: "absolute",
  },
  dividerTextView: {
    backgroundColor: "#f8fcf2",
    padding: 5,
    paddingHorizontal: 7,
    borderRadius: 10,
  },
  dividerText: {
    textAlign: "center",
    fontSize: 14,
    color: "darkgray",
    fontWeight: "700",
  },
  socialMediaButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  socialMediaButton: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    padding: 5,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    elevation: 5,
  },
  socialMediaButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  loginLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    fontWeight: "600",
    color: "gray",
  },
  loginLink: {
    fontSize: 16,
    fontWeight: "600",
    color: "gray",
    textDecorationLine: "underline",
  },
});