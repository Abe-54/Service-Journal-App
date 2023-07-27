import { Entypo, FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  Button,
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Colors from "../../constants/Colors";

interface SearchbarProps {
  clicked: boolean;
  searchPhrase: string;
  setSearchPhrase: (phrase: string) => void;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  OnCanceled?: () => void;
  searchPlaceholder?: string;
}

const Searchbar = ({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
  OnCanceled,
  searchPlaceholder,
}: SearchbarProps) => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }
      >
        <FontAwesome
          name="search"
          size={24}
          color="black"
          style={clicked ? { marginHorizontal: 15 } : { margin: 0 }}
        />
        <TextInput
          style={styles.input}
          placeholder={searchPlaceholder ? searchPlaceholder : "Search"}
          onChangeText={(text) => setSearchPhrase(text)}
          value={searchPhrase}
          onFocus={() => setClicked(true)}
        />
        {clicked && searchPhrase.length > 0 && (
          <View
            style={{ marginRight: 15 }}
            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
          >
            <Entypo
              name="cross"
              size={20}
              color="black"
              onPress={() => {
                setSearchPhrase("");
              }}
            />
          </View>
        )}
      </View>
      {clicked && (
        <View>
          <Pressable
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
              setSearchPhrase("");
            }}
            style={{ marginLeft: 10 }}
          >
            <Text
              style={{ color: Colors.accent, fontSize: 16, fontWeight: "600" }}
            >
              Cancel
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Searchbar;

const styles = StyleSheet.create({
  container: {
    // margin: 15,
    padding: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "75%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
});
