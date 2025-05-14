import { jwtDecode } from "jwt-decode";

export const isImageUrlValid = (url) => {
  const img = new Image();
  img.src = url;
  return new Promise((resolve) => {
    img.onerror = () => resolve(false);
    img.onload = () => resolve(true);
  });
};
