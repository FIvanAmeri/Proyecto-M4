"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/app/interfaces";
import Card from "@/app/components/Card/Card";
import { useFavorites } from "@/app/contexts/favoriteContext";
import { useAuth } from "@/app/contexts/authContext";

const FavoritesPage = () => {
  const { user } = useAuth();
  const { favorites, toggleFavorite, clearFavorites } = useFavorites();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      const storedFavorites = JSON.parse(localStorage.getItem(`favorites_${user.user.id}`) || "[]");
      storedFavorites.forEach((product: Product) => {
        if (!favorites.some((fav) => fav.id === product.id)) {
          toggleFavorite(product);
        }
      });
    }
  }, [user, favorites, toggleFavorite, router]);

  useEffect(() => {
    if (user && favorites.length > 0) {
      localStorage.setItem(`favorites_${user.user.id}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);

  return (
    <div className="container mt-6">
      <h2 className="text-2xl font-semibold mb-4">Mis Favoritos</h2>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {favorites.map((product) => (
            <Card
              key={product.id}
              {...product}
              isFavorite={true}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      ) : (
        <p>No tienes productos favoritos.</p>
      )}
      {favorites.length > 0 && (
        <button
          className="mt-4 py-2 px-6 bg-sky-500 hover:bg-sky-600 text-white rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
          onClick={clearFavorites}
        >
          Borrar todos los favoritos
        </button>
      )}
    </div>
  );
};

export default FavoritesPage;
