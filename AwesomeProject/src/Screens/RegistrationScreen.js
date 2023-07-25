import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import UserPhoto from "../images/userPhoto.png";
import addIcon from "../images/add.png";
import deleteIcon from "../images/delete.png";

const RegistrationScreen = () => {
  const [userPhoto, _setUserPhoto] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);

  const toggleShowPassword = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset="-260"
      >
        <View style={styles.container}>
          <View style={styles.accountImage}>
            {userPhoto && <Image source={UserPhoto} style={styles.userPhoto} />}
            <Pressable style={styles.addButton}>
              {!userPhoto && <Image source={addIcon} style={styles.icon} />}
              {userPhoto && <Image source={deleteIcon} style={styles.icon} />}
            </Pressable>
          </View>
          <Text style={styles.title}>Реєстрація</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value="login"
              placeholder="Логін"
              placeholderTextColor="#BDBDBD"
              inputMode="text"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value="email"
              placeholder="Адреса електронної пошти"
              placeholderTextColor="#BDBDBD"
              inputMode="text"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputPassword}
              value="password"
              placeholder="Пароль"
              placeholderTextColor="#BDBDBD"
              inputMode="text"
              textContentType="newPassword"
              secureTextEntry={passwordVisibility}
            />
            <Pressable onPress={toggleShowPassword}>
              {passwordVisibility && (
                <Text style={styles.showPasswordText}>Показати</Text>
              )}
              {!passwordVisibility && (
                <Text style={styles.showPasswordText}>Сховати</Text>
              )}
            </Pressable>
          </View>
          <Pressable style={styles.registerBtn}>
            <Text style={styles.registerBtnText}>Зареєструватися</Text>
          </Pressable>
          <Pressable>
            <Text style={styles.text}>Вже є акаунт? Увійти</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 45,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  accountImage: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    position: "absolute",
    bottom: 460,
    borderRadius: 16,
  },
  userPhoto: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  addButton: { position: "absolute", top: 81, left: 107 },
  icon: {
    width: 25,
    height: 25,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    color: "#212121",
    marginBottom: 32,
  },
  inputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F6F6F6",
    marginBottom: 16,
    borederWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  input: {
    width: "100%",
    height: "100%",
    fontStyle: "Roboto-Regular",
    fontSize: 16,
  },
  inputPassword: {
    width: "70%",
    height: "100%",
    fontStyle: "Roboto-Regular",
    fontSize: 16,
  },
  showPasswordText: {
    fontSize: 16,
    color: "#1B4371",
  },
  registerBtn: {
    alignItems: "center",
    width: "100%",
    padding: 16,
    fontStyle: "Roboto-Regular",
    fontSize: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginTop: 27,
  },
  registerBtnText: {
    fontSize: 16,
    color: "#ffffff",
  },
  text: {
    color: "#1B4371",
    fontStyle: "Roboto-Regular",
    fontSize: 16,
    marginTop: 16,
  },
});

export default RegistrationScreen;
