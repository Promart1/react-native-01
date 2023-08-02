import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/Screens/LoginScreen";
import Registration from "./src/Screens/RegistrationScreen";
import Home from "./src/Screens/Home";
import { ImageBackground, StyleSheet, View } from "react-native";
import PostsScreen from "./src/Screens/PostScreen";
import { useFonts } from "expo-font";

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./src/Fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./src/Fonts/Roboto-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./src/images/PhotoBG.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <NavigationContainer>
          <MainStack.Navigator initialRouteName="Login">
            <MainStack.Screen name="Registration" component={Registration} />
            <MainStack.Screen name="Login" component={Login} />
            <MainStack.Screen
              name="Home"
              component={Home}
              options={{ title: "Start screen" }}
            />
          </MainStack.Navigator>
        </NavigationContainer>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: { flex: 1, justifyContent: "center" },
});
