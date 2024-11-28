"use client";

import { AuthContext } from "@/app/contexts/authContext";
import { CartContext } from "@/app/contexts/cartContext";
import { useFavorites } from "@/app/contexts/favoriteContext";  
import { Product } from "@/app/interfaces";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import swal from "sweetalert";

interface ProductDetailProps {
  product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const { user } = useContext(AuthContext);
  const { cart, setCart } = useContext(CartContext);
  const { favorites, toggleFavorite } = useFavorites();
  const router = useRouter();
  const { id, name, price, image, stock, description } = product;

  const isOnCart = cart?.map((item) => item.id).includes(product.id);
  const isFavorite = favorites.some((fav) => fav.id === id);

  const handleAddToCart = () => {
    if (user?.login) {
      setCart([...(cart || []), { id, name, price, image, stock, description }]);
      swal({ title: "Producto agregado" });
    } else {
      swal({ title: "Por favor, debe iniciar sesión" });
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product);
  };

  const handleShareWhatsApp = () => {
    const message = `¡Este producto es para vos!\n\n${name}\n\n${description}\n\nPrecio: $${price}\n\nMás detalles aquí: ${window.location.href}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <article className="relative flex items-start space-x-8 p-4 border border-gray-200 rounded-md mt-4">
      <img
        className="w-1/3 max-w-xs h-48 object-contain transition-transform duration-300 ease-in-out hover:scale-105"
        src={image}
        alt={name}
      />

      <div className="flex-grow text-center mt-14">
        <h1 className="text-xl font-semibold text-sky-500 mb-4">{name}</h1>
        <p className="text-sm text-gray-700 break-words">{description}</p>
      </div>

      <button
        onClick={handleToggleFavorite}
        className={`absolute top-4 right-4 text-2xl transition-colors duration-300 ${isFavorite ? "text-yellow-500" : "text-gray-400"}`}
      >
        ★
      </button>

      <div className="flex flex-col items-center justify-between w-[220px] p-4 border border-gray-300 rounded-lg space-y-4 mt-14">
        <p className="text-lg font-semibold text-gray-900">${price}</p>
        <p className="text-sm text-gray-600">En stock: {stock}</p>
        <button
          className="border border-black rounded-lg px-4 py-2 bg-white transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-buttonHover w-48"
          onClick={isOnCart ? () => router.push("/cart") : handleAddToCart}
        >
          {isOnCart ? "Vamos al carrito!" : "Agregar al carrito"}
        </button>
        <button
          onClick={handleShareWhatsApp}
          className="mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200"
        >
          Compartir por WhatsApp
        </button>
      </div>
    </article>
  );
};

export default ProductDetail;
