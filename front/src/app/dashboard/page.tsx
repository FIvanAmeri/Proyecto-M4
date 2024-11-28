"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/contexts/authContext";
import { Orders } from "@/app/interfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";


const Page = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState<Orders[]>([]);
  const [searchId, setSearchId] = useState<number | string>("");
  const [filteredOrders, setFilteredOrders] = useState<Orders[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      const storedOrders = localStorage.getItem("orders");
      if (storedOrders) {
        const parsedOrders: Orders[] = JSON.parse(storedOrders);
        const userOrders = parsedOrders.filter(order => order.userId === user.user.id);
        setOrders(userOrders);
        setFilteredOrders(userOrders); 
      }
    }
  }, [user, router]);

  useEffect(() => {
    if (searchId === "") {
      setFilteredOrders(orders);
    } else {
      const result = orders.filter(order => order.id === parseInt(searchId as string));
      setFilteredOrders(result);
    }
  }, [searchId, orders]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(e.target.value);
  };

  return (
    <div className="bg-tertiary min-h-screen p-6 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full bg-primary shadow-xl rounded-lg p-8">
        <h1 className="text-4xl font-extrabold text-quaternary text-center mb-8">
          Dashboard
        </h1>

        <div className="bg-secondary p-6 rounded-lg mb-8 shadow-md text-center">
          <h3 className="text-2xl font-semibold text-quaternary mb-6">
            {user?.user?.name}
          </h3>

          <div className="flex justify-between items-center gap-4">
            <div className="flex-1 border border-quaternary rounded-md p-4 transition ease-in-out delay-150 hover:scale-[102%]">
              <h4 className="text-lg text-quaternary font-medium">Email</h4>
              <p className="text-quaternary">{user?.user?.email}</p>
            </div>

            <div className="flex-1 border border-quaternary rounded-md p-4 transition ease-in-out delay-150 hover:scale-[102%]">
              <h4 className="text-lg text-quaternary font-medium">Teléfono</h4>
              <p className="text-quaternary">{user?.user?.phone}</p>
            </div>

            <div className="flex-1 border border-quaternary rounded-md p-4 transition ease-in-out delay-150 hover:scale-[102%]">
              <h4 className="text-lg text-quaternary font-medium">Dirección</h4>
              <p className="text-quaternary">{user?.user?.address}</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-quaternary mb-4 text-center">
          Órdenes
        </h2>

        <div className="mb-6 flex justify-center items-center gap-4">
          <input
            type="number"
            placeholder="Buscar por ID de orden"
            value={searchId}
            onChange={handleSearchChange}
            className="p-2 border border-quaternary rounded-md"
          />
        </div>

        <div className="max-h-[600px] overflow-y-auto bg-primary border border-quaternary rounded-lg p-4 shadow-inner scrollbar-thin scrollbar-thumb-quaternary scrollbar-track-secondary">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, i) => (
              <div key={i} className="bg-secondary p-4 my-2 rounded-md shadow-md text-center">
                <p className="text-quaternary font-medium">Órdenes por ID: {order.id}</p>
                <div className="mt-4">
                  {order.product.map((product, j) => (
                    <div
                      key={j}
                      className="flex items-center justify-between mt-4 border-b border-quaternary pb-2"
                    >
                      <div>
                        <p className="text-quaternary">Artículo: {product.name}</p>
                        <p className="text-quaternary">Precio: ${product.price}</p>
                        <p className="text-quaternary"> stock: {product.stock}</p>
                      </div>
                      <div className="ml-4">
                        <Image
                          width={50}
                          height={50}
                          src={product.image}
                          alt={product.name}
                          className="object-contain rounded-md"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-quaternary text-center">No se encontraron órdenes con ese ID!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
