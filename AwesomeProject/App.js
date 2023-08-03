import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/Screens/Home";
import { ImageBackground, StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import LoginScreen from "./src/Screens/LoginScreen";
import RegistrationScreen from "./src/Screens/RegistrationScreen";
import CommentScreen from "./src/Screens/CommentsScreen";
import MapScreen from "./src/Screens/MapScreen";

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./src/Fonts/Roboto-Medium.ttf"),
    normal: require("./src/Fonts/Roboto-Regular.ttf"),
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
            <MainStack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            ></MainStack.Screen>
            <MainStack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <MainStack.Screen
              name="CommentScreen"
              component={CommentScreen}
              options={{
                title: "Коментарі",
                headerStyle: {
                  backgroundColor: "#ffffff",
                  shadowColor: "rgba(0,0,0,0.3)",
                  height: 88,
                },
                headerTintColor: "#212121",
                headerTitleStyle: {
                  marginLeft: 60,
                  fontFamily: "Roboto-Medium",
                  fontSize: 22,
                },
              }}
            />
            <MainStack.Screen
              name="MapScreen"
              component={MapScreen}
              options={{
                title: "Мапа",
                headerStyle: {
                  backgroundColor: "#ffffff",
                  shadowColor: "rgba(0,0,0,0.3)",
                  height: 88,
                },
                headerTintColor: "#212121",
                headerTitleStyle: {
                  marginLeft: 80,
                  fontFamily: "Roboto-Medium",
                  fontSize: 22,
                },
              }}
            />
          </MainStack.Navigator>
        </NavigationContainer>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  image: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  navContainer: {
    colors: {
      background: "transparent",
    },
  },
});
