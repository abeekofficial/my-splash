import { createContext, useEffect, useReducer } from "react";

export const GlobalContext = createContext();

const dataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("my-splash")) || { likedImages: [] };
};

const changeState = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LIKE":
      return {
        ...state,
        likedImages: [...state.likedImages, payload],
      };
    case "UNLIKE":
      return {
        ...state,
        likedImages: state.likedImages.filter((image) => image.id !== payload),
      };
    default:
      return state;
  }
};

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(changeState, dataFromLocalStorage());

  useEffect(() => {
    localStorage.setItem("my-splash", JSON.stringify(state));
  }, [state]);

  // for checking likedImage
  const likedImage = (item) => {
    return state.likedImages.some((img) => img.id === item.id);
  };

  return (
    <GlobalContext.Provider value={{ ...state, dispatch, likedImage }}>
      {children}
    </GlobalContext.Provider>
  );
};
