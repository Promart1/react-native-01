import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import Send from "../images/Send.png";
import uuid from "react-native-uuid";
import { db } from "../../config";
import { doc, updateDoc, getDocs, collection } from "firebase/firestore";
import { useEffect } from "react";

export default function CommentScreen() {
  const [inputValue, setInputValue] = useState("");
  const {
    params: { postComments, postImg },
  } = useRoute();
  const [comments, _setComments] = useState(postComments);
  const [image, _setImage] = useState(postImg);
  const [newComment, setNewComment] = useState(null);

  const route = useRoute();
  const way = route.params?.way;
  const id = route.params?.id;
  const currentDate = Date.now();

  const updateDataInFirestore = async (collectionName, docId) => {
    try {
      const ref = doc(db, collectionName, docId);

      await updateDoc(ref, {
        comments: [
          ...comments,
          { comment: inputValue, currentDate, id: uuid.v4() },
        ],
      });
      console.log("document updated");
    } catch (error) {
      console.log(error);
    } finally {
      setInputValue("");
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const snapshot = await getDocs(collection(db, "posts"));

        const postsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        const comments = postsData.find((post) => post.id === id).data.comments;

        setComments(comments);
      } catch (error) {
        console.log(error);
        throw error;
      }
    })();
  }, [inputValue]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? "-320" : "-320"}
        >
          <Image source={image} style={styles.postImg} />
          {comments.map((comment) => {
            return (
              <View style={styles.mainCommentContainer}>
                <Image source={comment.avatar} style={styles.avatar} />
                <View style={styles.commentContainer}>
                  <Text style={styles.text}>{comment.text}</Text>
                  <Text style={styles.date}>{comment.date}</Text>
                </View>
              </View>
            );
          })}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setNewComment}
              value={newComment}
              placeholder="Коментувати..."
              placeholderTextColor="#BDBDBD"
              inputMode="text"
            />
            <Pressable
              style={styles.button}
              onPress={() => updateDataInFirestore("posts", id)}
            >
              <Image source={Send} />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
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
  postImg: {
    height: 240,
    marginBottom: 32,
    borderRadius: 8,
    width: "100%",
  },
  mainCommentContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  commentContainer: {
    backgroundColor: "rgba(0,0,0,0.03)",
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    width: 280,
  },
  text: {
    color: "#212121",
    fontFamily: "normal",
    fontSize: 13,
    marginBottom: 8,
  },
  date: {
    color: "#BDBDBD",
    fontFamily: "normal",
    fontSize: 10,
  },
  input: {
    width: "80%",
    color: "#212121",
    fontStyle: "normal",
    fontSize: 16,
  },
  inputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 8,
    paddingLeft: 16,
    backgroundColor: "#F6F6F6",
    marginBottom: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
  },
  button: {
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    borderRadius: 17,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
