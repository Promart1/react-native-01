import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, View } from "react-native";
import PostsScreen from "./src/Screens/PostScreen";
import { useFonts } from "expo-font";

export default function App() {
  const [_fontsLoaded] = useFonts({
    "Roboto-Medium": require("./src/Fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./src/Fonts/Roboto-Regular.ttf"),
  });
  return (
    <View style={styles.container}>
      <PostsScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: { flex: 1, justifyContent: "center" },
});
