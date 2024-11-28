"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/contexts/authContext";
import { Orders } from "@/app/interfaces";

const OrdersPage = () => {
  const { user } = useContext(AuthContext);
  const [mounted, setMounted] = useState(false);
  const [orders, setOrders] = useState<Orders[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && user) {
      const storedOrders = localStorage.getItem("orders");
      if (storedOrders) {
        const parsedOrders: Orders[] = JSON.parse(storedOrders);
        const userOrders = parsedOrders.filter(order => order.userId === user.user.id);
        setOrders(userOrders);
      }
    }
  }, [mounted, user]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-tertiary min-h-screen p-6 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full bg-primary shadow-xl rounded-lg p-8">
        <h1 className="text-4xl font-extrabold text-quaternary text-center mb-8">
          Mis Órdenes
        </h1>

        <div className="max-h-[600px] overflow-y-auto bg-primary border border-quaternary rounded-lg p-4 shadow-inner scrollbar-thin scrollbar-thumb-quaternary scrollbar-track-secondary">
          {orders.length > 0 ? (
            orders.map((order, i) => (
              <div
                key={i}
                className="bg-secondary p-4 my-2 rounded-md shadow-md text-center"
              >
                <p className="text-quaternary font-medium">Órdenes por ID: {order.id}</p>
                <div className="mt-2">
                  {order.product.map((product, j) => (
                    <p key={j} className="text-quaternary mt-8">
                      Artículo: {product.name} - Precio: ${product.price}
                    </p>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-quaternary text-center">No hay órdenes!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
