"use client";

import { Product } from "@/app/interfaces";
import Link from "next/link";
import Image from "next/image";
import { useFavorites } from "@/app/contexts/favoriteContext";

interface CardProps extends Product {
  variant?: "primary" | "secondary";
}

const Card = ({
  name,
  image,
  price,
  id,
  description = "",
  stock = 0,
  categoryId = 0,
  variant = "primary",
}: CardProps) => {
  const imagePath = image.startsWith("http") ? image : `/assets/${image}`;
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.id === id);
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite({ id, name, image, price, description, stock, categoryId });
  };

  const handleShareWhatsApp = () => {
    const productLink = `${window.location.origin}/products/${id}`;
    const message = `¡Este producto es para vos!\n\n${name}\nPrecio: $${price}\n${image}Ver más: ${productLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      className={`flex flex-col justify-between h-full transition ease-in-out delay-150 hover:scale-[102%] ${variant === "primary" ? "bg-primary" : "bg-secondary"}`}
    >
      <div className="relative flex-grow">
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 text-xl transition-colors duration-300 ${isFavorite ? 'text-yellow-500' : 'text-gray-400'}`}
        >
          ★
        </button>

        <Link href={`/products/${id}`}>
          <Image
            width={200}
            height={200}
            src={imagePath}
            alt={name}
            className="object-contain h-48 w-full cursor-pointer"
          />
        </Link>
      </div>
      <h3 className="mb-2 text-center">{name}</h3>
      <p className="mt-2 text-center">Precio: ${price}</p>

      <button
        onClick={handleShareWhatsApp}
        className="mt-4 mx-auto px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 mb-4"
      >
        Compartir en WhatsApp
      </button>
    </div>
  );
};

export default Card;
