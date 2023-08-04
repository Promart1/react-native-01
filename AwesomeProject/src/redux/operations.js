import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../config";

import {
  authError,
  authSuccess,
  authLogOut,
  logInError,
  logInSuccess,
} from "./authSlice";

export const authRegister =
  ({ login, email, password }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
      });
      const { displayName, uid } = auth.currentUser;
      dispatch(authSuccess({ userId: uid, login: displayName, email }));
    } catch (error) {
      dispatch(authError(error.message));
    }
  };

export const authLogin =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(
        logInSuccess({
          userId: credentials.user.uid,
          login: credentials.user.displayName,
          email: credentials.user.email,
        })
      );
      return credentials.user;
    } catch (error) {
      dispatch(logInError(error.message));
    }
  };

export const authSingOut = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(authLogOut());
  } catch (error) {
    dispatch(authError(error.message));
  }
};
