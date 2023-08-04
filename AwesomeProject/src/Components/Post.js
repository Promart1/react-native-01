import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CommentNull from "../images/messagenull.png";
import Comment from "../images/message.png";
import Map from "../images/map-pin.png";
import Like from "../images/like.png";
import { addLike } from "../redux/postsSlice";
import { useDispatch } from "react-redux";

export default function Post({ post }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const AddLike = () => {
    dispatch(addLike(post.id));
  };
  return (
    <View key={post.id} style={styles.postContainer}>
      <Image source={post.image} style={styles.postImg} />
      <Text style={styles.postText}>{post.name}</Text>
      <View style={styles.description}>
        <View style={{ display: "flex", flexDirection: "row", gap: 20 }}>
          <Pressable
            onPress={() =>
              navigation.navigate("CommentScreen", {
                postComments: post.comments,
                postImg: post.image,
              })
            }
          >
            {post.comments.length > 0 ? (
              <View style={styles.commentContainer}>
                <Image source={Comment} style={styles.commentImg} />
                <Text style={{ color: "#212121" }}>{post.comments.length}</Text>
              </View>
            ) : (
              <View style={styles.commentContainer}>
                <Image source={CommentNull} style={styles.commentImg} />
                <Text style={{ color: "#BDBDBD" }}>{post.comments.length}</Text>
              </View>
            )}
          </Pressable>
          <Pressable onPress={AddLike}>
            <View style={styles.commentContainer}>
              <Image source={Like} />
              <Text style={{ color: "#212121" }}>{post.likes}</Text>
            </View>
          </Pressable>
        </View>

        <Pressable
          onPress={() =>
            navigation.navigate("MapScreen", { postLocation: post.location })
          }
        >
          <View style={styles.placeContainer}>
            <Image source={Map} />
            <Text style={styles.placeText}>{post.place}</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 32,
  },
  postImg: {
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
    width: "100%",
  },
  postText: {
    color: "#212121",
    fontFamily: "medium",
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  commentContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  commentImg: {
    width: 24,
    height: 24,
    marginRight: 6,
  },
  placeContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  placeText: {
    color: "#212121",
    fontFamily: "normal",
    fontSize: 16,
    marginLeft: 4,
    textDecorationLine: "underline",
  },
});

// import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// import messagenull from "../images/messagenull.png";
// import Map from "../images/map-pin.png";

// export const PostComponent = ({
//   id,
//   way,
//   name,
//   commentsNumber,
//   country,
//   coords,
// }) => {
//   const navigation = useNavigation();

//   const handleCommentsRedirect = (way) => {
//     navigation.navigate("Comments", { way: way, id: id });
//   };

//   const handleMapRedirect = (coords) => {
//     navigation.navigate("Map", { coords: coords });
//   };

//   return (
//     <View style={{ marginBottom: 32 }}>
//       <View style={{ marginBottom: 8 }}>
//         <Image
//           source={typeof way === "number" ? way : { uri: way }}
//           resizeMode={"cover"}
//           style={styles.image}
//         />
//       </View>
//       <Text style={styles.nameText}>{name}</Text>
//       <View style={styles.aboutContainer}>
//         <View style={styles.aboutLeftContainer}>
//           <TouchableOpacity onPress={() => handleCommentsRedirect(way)}>
//             <Image source={messagenull} style={styles.commentImg} />
//           </TouchableOpacity>
//           <Text
//             style={[
//               styles.text,
//               {
//                 color: "#BDBDBD",
//               },
//             ]}
//           >
//             {commentsNumber}
//           </Text>
//         </View>
//         <View style={styles.aboutRightContainer}>
//           <TouchableOpacity onPress={() => handleMapRedirect(coords)}>
//             <Image source={Map} style={styles.commentImg} />
//           </TouchableOpacity>
//           <Text
//             style={[
//               styles.text,
//               {
//                 color: "#212121",
//                 textDecorationLine: "underline",
//               },
//             ]}
//           >
//             {country}
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   text: {
//     fontFamily: "Roboto-Regular",
//     fontSize: 16,
//     lineHeight: 18.75,
//   },
//   commentImg: {
//     width: 24,
//     height: 24,
//     marginRight: 6,
//   },
//   nameText: {
//     marginBottom: 8,
//     fontFamily: "Roboto-Medium",
//     fontSize: 16,
//     lineHeight: 18.75,
//     color: "#212121",
//   },

//   image: {
//     width: "100%",
//     height: 240,
//     borderRadius: 8,
//   },

//   aboutContainer: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },

//   aboutLeftContainer: {
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//   },

//   aboutRightContainer: {
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//   },
// });
