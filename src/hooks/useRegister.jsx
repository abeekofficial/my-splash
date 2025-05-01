// hooks/useRegister.js
import { auth } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

// react-toastify
import { toast } from "react-toastify";

// useGlobalContext
import { useGlobalContext } from "./useGlobalContext";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const { dispatch } = useGlobalContext();
  const navigate = useNavigate();

  // register with google
  const registerWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch({ type: "LOGIN", payload: user });
        toast.success(`Welcome ${user.displayName}`);
        navigate("/");
        return true;
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        return false;
      });
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
      toast.success("Logged out successfully");
      navigate("/login");
      return true;
    } catch (error) {
      console.error("error in signing out", error);
      return false;
    }
  };

  // register with email
  const registerWithEmail = (displayName, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateProfile(auth.currentUser, {
          displayName: displayName,
          photoURL: `https://api.dicebear.com/9.x/initials/svg?seed=${displayName}`,
        });
        // Signed up
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        toast.success(`Welcome ${displayName}`);
        navigate("/");
        return true;
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        return false;
      });
  };
  return {
    registerWithGoogle,
    handleLogout,
    registerWithEmail,
  };
};
