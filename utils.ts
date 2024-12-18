import { Product } from "@/types";

export const key = "PRODUCT";
export const saveToLocalStorage = (key: string, value: Product | unknown) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    console.log("Server-side rendering: localStorage is not available");
  }
};

export const loadFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  } else {
    console.log("Server-side rendering: localStorage is not available");
  }
};
