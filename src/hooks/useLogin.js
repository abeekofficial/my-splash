import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useGlobalContext } from "./useGlobalContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const { dispatch } = useGlobalContext();
  const navigate = useNavigate();

  const loginWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      dispatch({ type: "LOGIN", payload: user });
      toast.success(`Welcome ${user.displayName || "User"}`);
      navigate("/"); // Redirect to home page after login
      return true;
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error("Email or password is incorrect");
      return false;
    }
  };

  return { loginWithEmail };
};
