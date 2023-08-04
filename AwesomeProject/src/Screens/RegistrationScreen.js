import React, { useState } from "react";
import {
  Alert,
  Image,
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
import { useNavigation } from "@react-navigation/native";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../../config";
import { createUser } from "../redux/authSlice";
import { authRegister } from "../redux/operations";

const RegistrationScreen = () => {
  const [userPhoto, setUserPhoto] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const toggleShowPassword = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const onRegistrate = () => {
    dispatch(authRegister({ login, email, password }));
    Alert.alert(`${login}, thank you for registration`);
    navigation.navigate("Home");
    setLogin("");
    setEmail("");
    setPassword("");
  };

  const onAddPhoto = () => {
    setUserPhoto(!userPhoto);
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
            <Pressable style={styles.addButton} onPress={onAddPhoto}>
              {!userPhoto && <Image source={addIcon} style={styles.icon} />}
              {userPhoto && <Image source={deleteIcon} style={styles.icon} />}
            </Pressable>
          </View>
          <Text style={styles.title}>Реєстрація</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={login}
              placeholder="Логін"
              placeholderTextColor="#BDBDBD"
              inputMode="text"
              onChangeText={setLogin}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={email}
              placeholder="Адреса електронної пошти"
              placeholderTextColor="#BDBDBD"
              inputMode="text"
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputPassword}
              value={password}
              placeholder="Пароль"
              placeholderTextColor="#BDBDBD"
              inputMode="text"
              textContentType="newPassword"
              secureTextEntry={passwordVisibility}
              onChangeText={setPassword}
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
          <Pressable style={styles.registerBtn} onPress={onRegistrate}>
            <Text style={styles.registerBtnText}>Зареєструватися</Text>
          </Pressable>
          <Pressable>
            <Text
              style={styles.text}
              onPress={() => navigation.navigate("Login")}
            >
              Вже є акаунт? Увійти
            </Text>
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
    fontFamily: "medium",
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
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  input: {
    width: "100%",
    height: "100%",
    fontStyle: "normal",
    fontSize: 16,
  },
  inputPassword: {
    width: "70%",
    height: "100%",
    fontStyle: "normal",
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
    fontStyle: "normal",
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
    fontStyle: "normal",
    fontSize: 16,
    marginTop: 16,
  },
});

export default RegistrationScreen;
