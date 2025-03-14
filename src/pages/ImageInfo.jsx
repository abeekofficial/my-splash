import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const ImageInfo = () => {
  const { id } = useParams();
  console.log("ID malumoti =>", id);

  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_UNSPLASH_URL}/${id}?client_id=${
      import.meta.env.VITE_UNSPLASH_KEY
    }`
  );
  return <div>ImageInfo {id}</div>;
};

export default ImageInfo;
