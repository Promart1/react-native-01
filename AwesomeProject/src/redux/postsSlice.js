// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   posts: [],
// };

// export const postsSlice = createSlice({
//   name: "posts",
//   initialState,
//   reducers: {
//     addPost(state, action) {
//       state.posts = action.payload;
//     },
//   },
// });

// export const { addPost } = postsSlice.actions;
// export const postsReducer = postsSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-native-uuid";

const postsInitialState = [
  {
    id: 1,
    name: "Ліс",
    place: "Ivano-Frankivsk Region",
    location: { latitude: 49.2714836, longitude: 23.8227551 },
    comments: [],
    likes: 0,
    image: require("../images/forest.png"),
  },
  {
    id: 2,
    name: "Захід на Чорному морі",
    place: "Ukraine",
    location: { latitude: 44.5017086, longitude: 34.118931 },
    comments: [
      {
        id: "id-1",
        avatar: require("../images/userPhoto2.png"),
        text: "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
        date: "09 червня, 2020 | 08:40",
      },
      {
        id: "id-2",
        avatar: require("../images/userPhoto.png"),
        text: "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
        date: "09 червня, 2020 | 09:40",
      },
      {
        id: "id-3",
        avatar: require("../images/userPhoto2.png"),
        text: "Thank you! That was very helpful!",
        date: "09 червня, 2020 | 10:00",
      },
    ],
    likes: 0,
    image: require("../images/sunset.png"),
  },
  {
    id: 3,
    name: "Старий будиночок у Венеції",
    place: "Italy",
    location: { latitude: 45.4040691, longitude: 12.0576662 },
    comments: [
      {
        id: "id-1",
        avatar: require("../images/userPhoto2.png"),
        text: "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
        date: "09 червня, 2020 | 08:40",
      },
      {
        id: "id-2",
        avatar: require("../images/userPhoto.png"),
        text: "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
        date: "09 червня, 2020 | 09:40",
      },
      {
        id: "id-3",
        avatar: require("../images/userPhoto2.png"),
        text: "Thank you! That was very helpful!",
        date: "09 червня, 2020 | 10:00",
      },
    ],
    likes: 0,
    image: require("../images/oldHouse.png"),
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState: postsInitialState,
  reducers: {
    addPost: {
      reducer: (state, action) => {
        state.push(action.payload);
      },

      prepare: ({ name, place, location, image }) => {
        return {
          payload: {
            id: uuid.v4(),
            name,
            place,
            location,
            image,
            comments: [],
            likes: 0,
          },
        };
      },
    },
    addLike(state, action) {
      for (const post of state) {
        if (post.id === action.payload) {
          post.likes += 1;
          break;
        }
      }
    },
    addComment: {
      reducer: (state, action) => {
        for (const post of state) {
          if (post.id === action.payload.postId) {
            post.comments.push(action.payload.comment);
            break;
          }
        }
      },
      prepare: ({ postId, comment }) => {
        return {
          payload: {
            postId,
            comment: {
              id: comment.id,
              avatar: require("../images/userPhoto.png"),
              text: comment.text,
              date: comment.date,
            },
          },
        };
      },
    },
  },
});

export const { addPost, addLike, addComment } = postsSlice.actions;
export const postsReducer = postsSlice.reducer;
