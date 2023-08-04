import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Pressable,
  Image,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import UserPhoto from "../images/userPhoto.png";
import Delete from "../images/delete.png";
import Add from "../images/add.png";
import LogOut from "../images/log-out.png";
import posts from "../Data/List";
import Post from "../Components/Post";
import { UserPostsComponent } from "../Components/UserPost";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getUser } from "../redux/selectors";
import { authSingOut } from "../redux/operations";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const posts = useSelector(getPosts);
  const [userPhoto, setUserPhoto] = useState(true);

  const onLogout = () => {
    navigation.navigate("Login");
    dispatch(authSingOut());
  };

  const onAddPhoto = () => {
    setUserPhoto(!userPhoto);
  };

  return (
    <View style={styles.container}>
      <View style={styles.accountImage}>
        {userPhoto && <Image source={UserPhoto} style={styles.userPhoto} />}
        <Pressable style={styles.addBtn} onPress={onAddPhoto}>
          {!userPhoto && <Image source={Add} style={styles.icon} />}
          {userPhoto && <Image source={Delete} style={styles.icon} />}
        </Pressable>
      </View>
      <View style={styles.profileContainer}>
        <Pressable style={styles.logOutBtn} onPress={onLogout}>
          <Image source={LogOut} style={styles.icon} />
        </Pressable>
        <Text style={styles.userName}>{user.login}</Text>
      </View>
      <ScrollView style={styles.mainPostContainer}>
        {posts.map((post) => {
          return <Post post={post} />;
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 120,
  },
  accountImage: {
    alignSelf: "center",
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    top: 60,
    borderRadius: 16,
    zIndex: 2,
  },
  userPhoto: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  addBtn: { position: "absolute", top: 81, left: 107 },
  icon: {
    width: 25,
    height: 25,
  },
  profileContainer: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 32,
    alignItems: "center",
  },

  logOutBtn: { position: "absolute", top: 22, left: 320 },
  userName: {
    fontFamily: "medium",
    fontSize: 30,
    color: "#212121",
  },
  mainPostContainer: {
    backgroundColor: "#ffffff",
    paddingLeft: 16,
    paddingRight: 16,
  },
});
