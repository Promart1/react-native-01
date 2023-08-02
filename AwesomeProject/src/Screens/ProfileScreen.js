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

export default function ProfileScreen() {
  const navigation = useNavigation();

  const onLogout = () => {
    navigation.navigate("Login");
  };

  const [userPhoto, setUserPhoto] = useState(true);

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
        <Text style={styles.userName}>Natali Romanova</Text>
      </View>
      <ScrollView style={styles.mainPostContainer}></ScrollView>
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
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    color: "#212121",
  },
  mainPostContainer: {
    backgroundColor: "#ffffff",
    paddingLeft: 16,
    paddingRight: 16,
  },
});
