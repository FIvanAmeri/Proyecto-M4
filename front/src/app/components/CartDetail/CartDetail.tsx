"use client";

import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "@/app/contexts/cartContext";
import { AuthContext } from "@/app/contexts/authContext";
import { postOrders } from "@/app/services/orders";
import { Product } from "@/app/interfaces";
import Image from "next/image";

const CartDetail = () => {
  const { user, orders, setOrders } = useContext(AuthContext);
  const { cart, emptyCart, setCart } = useContext(CartContext);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const validCart = cart ?? [];

  const handleBuy = async () => {
    try {
      if (!user) {
        alert("Debes estar logueado para realizar una compra.");
        return;
      }

      const res = await postOrders(user?.user.id || 0, user?.token || "", validCart);

      if (res.status === "approved") {
        alert("Compra realizada con éxito");

        const productsInOrder: Product[] = validCart.map((item) => ({
          ...item,
          categoryId: 1,
        }));

        setOrders([
          ...orders,
          {
            id: parseInt(res.id),
            product: productsInOrder,
            status: res.status,
            date: new Date().toISOString(),
            userId: user?.user.id || 0,
          },
        ]);

        emptyCart();
      } else {
        alert("Hubo un problema con la compra: " + res.message);
      }
    } catch (error) {
      console.error("Error al realizar la compra:", error);
      alert("Ocurrió un error al procesar la compra.");
    }
  };

  const handleRemove = (id: number) => {
    const updatedCart = validCart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };
  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto my-8 border border-gray-300">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Carrito</h1>
      {validCart.length === 0 ? (
        <h2 className="text-center text-gray-500 text-xl">Tu carrito está vacío!</h2>
      ) : (
        <div className="space-y-4">
          {validCart.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200 transition duration-200 hover:bg-gray-100 relative">
              <button onClick={() => handleRemove(item.id)} className="absolute top-2 right-2 text-red-500 font-bold text-lg">X</button>
              <div className="flex flex-col items-center">
                <h2 className="text-lg font-semibold text-gray-700 text-center mb-2">{item.name}</h2>
                <h2>{item.description}</h2>
                <Image className="w-full h-72 object-contain transition-transform duration-300 ease-in-out hover:scale-105" src={item.image} alt={item.name} width={300} height={300} />
              </div>
              <p className="text-md font-semibold text-gray-800">${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
      {validCart.length > 0 && (
        <button onClick={handleBuy} className="w-full mt-6 py-2 bg-quaternary text-white font-semibold rounded-lg hover:bg-purple-800 transition duration-200">
          Compremos
        </button>
      )}
    </div>
  );
};

export default CartDetail;
