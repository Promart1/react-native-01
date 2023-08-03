import { View, ScrollView, StyleSheet, Image, Text } from "react-native";
import UserPhoto from "../images/userPhoto.png";
import posts from "../Data/List";
import Post from "../Components/Post";

export default function PostScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.accountView}>
        <Image source={UserPhoto} style={styles.userPhoto} />
        <View style={styles.textView}>
          <Text style={styles.userLogin}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>
      <View style={styles.mainPostContainer}>
        {posts.map((post) => {
          return <Post post={post} />;
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  accountView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  textView: {
    marginLeft: 8,
  },
  userPhoto: {
    width: 60,
    height: 60,
  },
  userLogin: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 13,
  },
  userEmail: {
    color: "#212121",
    fontFamily: "normal",
    fontSize: 11,
  },
  mainPostContainer: {
    marginBottom: 20,
  },
});
