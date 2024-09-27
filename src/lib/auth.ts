import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  TwitterAuthProvider,
  UserCredential,
  signInWithPopup,
} from 'firebase/auth';

import { auth } from './firebase.config';

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

export const loginWithGoogle = async (): Promise<UserCredential> => {
  return await signInWithPopup(auth, googleProvider);
};

export const loginWithFacebook = async (): Promise<UserCredential> => {
  return await signInWithPopup(auth, facebookProvider);
};

export const loginWithTwitter = async (): Promise<UserCredential> => {
  return await signInWithPopup(auth, twitterProvider);
};
