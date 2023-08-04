import { View, ScrollView, StyleSheet, Image, Text } from "react-native";
import UserPhoto from "../images/userPhoto.png";
import posts from "../Data/List";
import Post, { PostComponent } from "../Components/Post";
import { useEffect } from "react";
import { getDocs } from "firebase/firestore";
import { auth, db } from "../../config";
import { addPost } from "../redux/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import { useState } from "react";
import { getPosts, getUser, selectPosts } from "../redux/selectors";

export default function PostScreen() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const user = useSelector(getUser);
  const posts = useSelector(getPosts);

  useEffect(() => {
    if (isFocused) {
      (async () => {
        try {
          const snapshot = await getDocs(collection(db, "posts"));

          const postsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
          dispatch(addPost(postsData));
        } catch (error) {
          console.log(error);
          throw error;
        }
      })();
    }
  }, [isFocused]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.accountView}>
        <Image source={UserPhoto} style={styles.userPhoto} />
        <View style={styles.textView}>
          <Text style={styles.userLogin}>{user.login}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
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
    fontFamily: "medium",
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
