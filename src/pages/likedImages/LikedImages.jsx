import React from "react";
import { useGlobalContext } from "../../hooks/useGlobalContext";

const LikedImages = () => {
  const data = useGlobalContext();
  console.log("LikedImages", data);

  return <div>LikedImages</div>;
};

export default LikedImages;
