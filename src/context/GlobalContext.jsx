import { createContext, useEffect, useReducer, useState } from "react";

export const GlobalContext = createContext();

// LocalStorage'dan ma'lumotlarni olish
const dataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("my-splash")) || { likedImages: [] };
};

const getThemeFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("theme")) || false; // false = light, true = dark
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
    default:
      return state;
  }
};

// GlobalContextProvider
export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(changeState, dataFromLocalStorage());
  const [theme, setTheme] = useState(getThemeFromLocalStorage());

  // Theme ni o'zgartirish funksiyasi
  const toggleTheme = () => {
    setTheme((prevTheme) => !prevTheme);
  };

  // LocalStorage'ga holatni saqlash
  useEffect(() => {
    localStorage.setItem("my-splash", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  // Rasm "like" qilinganligini tekshirish
  const likedImage = (item) => {
    return state.likedImages.some((img) => img.id === item.id);
  };

  return (
    <GlobalContext.Provider
      value={{
        ...state, // likedImages
        dispatch, // useReducer dispatch
        likedImage, // likedImage tekshirish funksiyasi
        theme, // theme holati
        toggleTheme, // theme ni o'zgartirish funksiyasi
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
