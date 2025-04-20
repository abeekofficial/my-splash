// hooks/useRegister.js
import { auth } from "../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// react-toastify
import { toast } from "react-toastify";

// useGlobalContext
import { useGlobalContext } from "./useGlobalContext";
import { signOut } from "firebase/auth";

export const useRegister = () => {
  const { dispatch } = useGlobalContext();

  const registerWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch({ type: "LOGIN", payload: user });
        console.log(user, "user id");
        toast.success(`Welcome ${user.displayName}`);
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
      toast.success("Logged out successfully");
      console.log("user signed out");
    } catch (error) {
      console.error("error in signing out", error);
    }
  };
  return {
    registerWithGoogle,
    handleLogout,
  };
};
