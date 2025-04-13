import { createContext, useEffect, useReducer, useState } from "react";

export const GlobalContext = createContext();

// LocalStorage'dan ma'lumotlarni olish
const dataFromLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem("my-splash"));
  return data || { likedImages: [], user: true };
};

// useReducer uchun reducer funksiyasi
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
    case "LOGIN":
      return {
        ...state,
        user: payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

// GlobalContextProvider
export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(changeState, dataFromLocalStorage());
  const [isExpanded, setIsExpanded] = useState(false); // Rasmning kattalik holati

  // LocalStorage'ga holatni saqlash
  useEffect(() => {
    localStorage.setItem("my-splash", JSON.stringify(state));
  }, [state]);

  // Rasm "like" qilinganligini tekshirish
  const likedImage = (item) => {
    return state.likedImages.some((img) => img.id === item.id);
  };

  // Rasmni kattalashtirish/kichraytirish funksiyasi
  const toggleImageSize = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <GlobalContext.Provider
      value={{
        ...state, // likedImages and user
        dispatch, // useReducer dispatch
        likedImage, // likedImage tekshirish funksiyasi
        isExpanded, // Rasmning kattalik holati
        toggleImageSize, // Rasmni kattalashtirish/kichraytirish funksiyasi
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
