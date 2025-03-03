import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("useGlobalCoxtext must be in the GlobalContextProvider()");
  }

  return context;
};
