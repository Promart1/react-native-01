import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import RegistrationScreen from "./RegistrationScreen";
import LoginScreen from "./LoginScreen";

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../images/PhotoBG.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <RegistrationScreen />
        {/* <LoginScreen /> */}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: { flex: 1, justifyContent: "center" },
  heading: {
    fontSize: 24,
    lineHeight: 84,
    fontWeight: "bold",
  },
});

export default PostsScreen;
