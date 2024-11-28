"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Product } from "@/app/interfaces";
import { AuthContext } from "@/app/contexts/authContext";

interface FavoriteContextProps {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  clearFavorites: () => void;
}

const FavoriteContext = createContext<FavoriteContextProps | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoriteProvider");
  }
  return context;
};

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const { user, favorites, setFavorites } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${user.user.id}`) || "[]");
      setFavorites(storedFavorites);
    }
  }, [user, setFavorites]);

  const toggleFavorite = (product: Product) => {
    if (!user) {
      return;
    }

    const updatedFavorites = favorites.some((fav) => fav.id === product.id)
      ? favorites.filter((fav) => fav.id !== product.id)
      : [...favorites, product];
    localStorage.setItem(`favorites_${user.user.id}`, JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const clearFavorites = () => {
    if (!user) {
      return;
    }

    setFavorites([]);
    localStorage.removeItem(`favorites_${user.user.id}`);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, clearFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
};
