import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Alert,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";

export default function LoginScreen() {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleShowPassword = () => {
    setPasswordVisibility(!passwordVisibility);
  };

  const onLogin = () => {
    Alert.alert(`Welcome, ${email}`);
    setEmail("");
    setPassword("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset="-200"
        >
          <View style={styles.loginContainer}>
            <Text style={styles.title}>Увійти</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={email}
                placeholder="Адреса електронної пошти"
                placeholderTextColor="#BDBDBD"
                inputMode="email"
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

            <Pressable style={styles.registerBtn} onPress={onLogin}>
              <Text style={styles.registerBtnText}>Увійти</Text>
            </Pressable>
            <Pressable>
              <Text style={styles.bottomText}>
                Немає акаунту?{" "}
                <Text style={styles.registrationText}>Зареєструватися</Text>
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "relative",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 111,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  loginContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    color: "#212121",
    marginBottom: 32,
  },
  input: {
    width: "100%",
    fontStyle: "Roboto-Regular",
    fontSize: 16,
  },
  inputPassword: {
    width: "70%",
    fontStyle: "Roboto-Regular",
    fontSize: 16,
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
  showPasswordText: {
    fontSize: 16,
    color: "#1B4371",
  },
  registerBtn: {
    alignItems: "center",
    width: 343,
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
  bottomText: {
    color: "#1B4371",
    fontStyle: "Roboto-Regular",
    fontSize: 16,
    marginTop: 16,
  },
  registrationText: {
    textDecorationLine: "underline",
  },
});
