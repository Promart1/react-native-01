import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import MapPin from "../images/map-pin.png";
import Trash from "../images/trash.png";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import CameraIcon from "../images/camera-icon.png";
import posts from "../Data/List";
import uuid from "react-native-uuid";

export default function CreatePostScreen() {
  const [name, setName] = useState("");
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, _setType] = useState(Camera.Constants.Type.back);
  const [place, setPlace] = useState("");
  const [uriImg, setUriImg] = useState(null);
  const [location, setLocation] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  const handleSubmit = () => {
    const post = {
      id: uuid.v4(),
      name: name,
      place: place,
      location: location,
      comments: [],
      likes: 0,
      image: { uri: uriImg },
    };
    posts.push(post);
    reset();
    navigation.navigate("PostScreen");
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coordinations = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coordinations);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const makePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setUriImg(uri);
    }
  };

  const reset = () => {
    setName("");
    setPlace("");
    setUriImg(null);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? "-250" : "-250"}
        >
          {uriImg ? (
            <Image source={{ uri: uriImg }} style={styles.imageContainer} />
          ) : (
            <Camera
              style={styles.imageContainer}
              type={type}
              ref={setCameraRef}
            >
              <View style={styles.photoView}>
                <Pressable style={styles.cameraBtn} onPress={makePhoto}>
                  <Image source={CameraIcon} style={styles.cameraIcon} />
                </Pressable>
              </View>
            </Camera>
          )}
          {uriImg && <Text style={styles.text}>Редагувати фото</Text>}
          {!uriImg && <Text style={styles.text}>Завантажте фото</Text>}
          <View style={styles.inputBox}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="Назва..."
                placeholderTextColor="#BDBDBD"
                inputMode="text"
              ></TextInput>
            </View>

            <View style={styles.inputContainer}>
              <Image source={MapPin} />
              <TextInput
                style={styles.input}
                placeholder="Місцевість..."
                placeholderTextColor="#BDBDBD"
                inputMode="text"
                onChangeText={setPlace}
                value={place}
              ></TextInput>
            </View>
          </View>

          {uriImg && name && place ? (
            <Pressable style={styles.mainBtn} onPress={handleSubmit}>
              <Text style={styles.mainBtnText}>Опублікувати</Text>
            </Pressable>
          ) : (
            <Pressable
              style={styles.disabledMainBtn}
              onPress={() => {
                Alert.alert("Please fill all folders");
              }}
            >
              <Text style={styles.disabledBtnText}>Опублікувати</Text>
            </Pressable>
          )}
          <Pressable style={styles.deleteBtn} onPress={reset}>
            <Image source={Trash} />
          </Pressable>
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },

  text: {
    marginTop: 8,
    color: "#BDBDBD",
    fontFamily: "normal",
    fontSize: 16,
  },
  inputBox: {
    marginTop: 32,
    marginBottom: 16,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  input: {
    width: "100%",
    height: 50,
    fontStyle: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
  },
  mainBtn: {
    alignItems: "center",
    width: "100%",
    padding: 16,
    fontStyle: "normal",
    fontSize: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginTop: 27,
  },
  mainBtnText: {
    fontSize: 16,
    color: "#ffffff",
  },
  disabledMainBtn: {
    alignItems: "center",
    width: "100%",
    padding: 16,
    fontStyle: "normal",
    fontSize: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    marginTop: 27,
  },
  disabledBtnText: {
    fontSize: 16,
    color: "#BDBDBD",
  },
  deleteBtn: {
    display: "flex",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    marginTop: 45,
    marginLeft: "auto",
    marginRight: "auto",
  },

  imageContainer: {
    backgroundColor: "#F6F6F6",
    height: 240,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    borderRadius: 8,
  },
  photoView: {
    backgroundColor: "transparent",
    justifyContent: "center",
    borderRadius: 8,
  },
  cameraIcon: {
    width: 24,
    height: 24,
  },
  cameraBtn: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 50,
  },
});
