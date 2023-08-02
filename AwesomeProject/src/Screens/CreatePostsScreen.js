import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import MapPin from "../images/map-pin.png";
import Trash from "../images/trash.png";

export default function CreatePostScreen() {
  const [name, setName] = useState("");

  const handleSubmit = () => {};

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? "-250" : "-250"}
        >
          <Text style={styles.text}>Редагувати фото</Text>
          <Text style={styles.text}>Завантажте фото</Text>
          <View style={styles.inputBox}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="Назва..."
                placeholderTextColor="#BDBDBD"
                inputMode="text"
              ></TextInput>
            </View>

            <View style={styles.inputContainer}>
              <Image source={MapPin} />
              <TextInput
                style={styles.input}
                placeholder="Місцевість..."
                placeholderTextColor="#BDBDBD"
                inputMode="text"
              ></TextInput>
            </View>
          </View>

          <Pressable style={styles.mainBtn} onPress={handleSubmit}>
            <Text style={styles.mainBtnText}>Опубліковати</Text>
          </Pressable>

          <Text style={styles.disabledBtnText}>Опубліковати</Text>

          <Pressable style={styles.deleteBtn} onPress>
            <Image source={Trash} />
          </Pressable>
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },

  text: {
    marginTop: 8,
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  inputBox: {
    marginTop: 32,
    marginBottom: 16,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  input: {
    width: "100%",
    height: 50,
    fontStyle: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
  },
  mainBtn: {
    alignItems: "center",
    width: "100%",
    padding: 16,
    fontStyle: "Roboto-Regular",
    fontSize: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginTop: 27,
  },
  mainBtnText: {
    fontSize: 16,
    color: "#ffffff",
  },
  disabledMainBtn: {
    alignItems: "center",
    width: "100%",
    padding: 16,
    fontStyle: "Roboto-Regular",
    fontSize: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    marginTop: 27,
  },
  disabledBtnText: {
    fontSize: 16,
    color: "#BDBDBD",
  },
  deleteBtn: {
    display: "flex",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    marginTop: 45,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
