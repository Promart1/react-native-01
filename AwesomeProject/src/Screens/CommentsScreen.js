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

export default function CommentScreen() {
  const {
    params: { postComments, postImg },
  } = useRoute();
  const [comments, _setComments] = useState(postComments);
  const [image, _setImage] = useState(postImg);
  const [newComment, setNewComment] = useState(null);

  const onAddComment = () => {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const min = new Date().getMinutes();
    const currentDate =
      date + " " + month + " " + year + " " + hours + ":" + min;
    const comment = {
      id: uuid.v4(),
      avatar: require("../images/userPhoto.png"),
      text: newComment,
      date: currentDate,
    };

    console.log(comment);
    setNewComment("");
  };

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
            <Pressable style={styles.button} onPress={onAddComment}>
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
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    marginBottom: 8,
  },
  date: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 10,
  },
  input: {
    width: "80%",
    color: "#212121",
    fontStyle: "Roboto-Regular",
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
