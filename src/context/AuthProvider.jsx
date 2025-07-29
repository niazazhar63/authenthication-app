import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, SetLoading] = useState(true);
  const provider = new GoogleAuthProvider();

  // create user
  const createUser = (email, password) => {
    SetLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials)=>{
      const createdUser = userCredentials.user;
      return sendEmailVerification(createdUser).then(()=>{
        
      })
    })
    .catch((err)=>{
      SetLoading(false)
      throw err
    })
  };


  // login user
  const loginUser = (email, password) => {
    SetLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // update user 
  const handleUpdateUser = (updateData)=>{
    SetLoading(true);
    return updateProfile(auth.currentUser, updateData)
  }

  // Login with google 
  const googleSignIn = ()=>{
    SetLoading(true);
    return signInWithPopup(auth, provider);
  }


  // log out user 
  const logOut = ()=>{
    SetLoading(true)
    return signOut(auth)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("Current User -->", currentUser);
      SetLoading(false);
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    logOut,
    handleUpdateUser,
    googleSignIn
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
