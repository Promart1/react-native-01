import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import messagenull from "../images/messagenull.png";
import Map from "../images/map-pin.png";
import like from "../images/like.png";

export const UserPostsComponent = ({
  id,
  way,
  name,
  commentsNumber,
  country,
  coords,
  likes,
}) => {
  const navigation = useNavigation();

  const handleCommentsRedirect = (way) => {
    navigation.navigate("Comments", { way: way, id: id });
  };

  const handleMapRedirect = (coords) => {
    navigation.navigate("Map", { coords: coords });
  };

  return (
    <View style={{ marginBottom: 32 }}>
      <View style={{ marginBottom: 8 }}>
        <Image
          source={typeof way === "number" ? way : { uri: way }}
          resizeMode={"cover"}
          style={{ width: "100%", height: 240, borderRadius: 8 }}
        />
      </View>
      <Text style={styles.name}>{name}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", gap: 24 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <TouchableOpacity onPress={() => handleCommentsRedirect(way)}>
              <Image source={messagenull} style={styles.commentImg} />
            </TouchableOpacity>

            <Text
              style={[
                styles.text,
                {
                  color: "#212121",
                },
              ]}
            >
              {commentsNumber}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <Image source={like} style={styles.commentImg} />
            <Text
              style={[
                styles.text,
                {
                  color: "#212121",
                },
              ]}
            >
              {likes}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <TouchableOpacity onPress={() => handleMapRedirect(coords)}>
            <Image source={Map} style={styles.commentImg} />
          </TouchableOpacity>
          <Text
            style={[
              styles.text,
              {
                color: "#212121",
                textDecorationLine: "underline",
              },
            ]}
          >
            {country}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "normal",
    fontSize: 16,
    lineHeight: 18.75,
  },

  name: {
    marginBottom: 8,

    fontFamily: "medium",
    fontSize: 16,
    lineHeight: 18.75,
    color: "#212121",
  },
  commentImg: {
    width: 24,
    height: 24,
    marginRight: 6,
  },
});
