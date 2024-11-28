import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  categoryId: number;
}

const SearchBar = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const searchBarRef = useRef<HTMLDivElement>(null);


  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  }, [API_URL]);


  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);


  useEffect(() => {
    if (searchTerm) {
      const results = products.filter((product) =>  
        [product.name, product.category, product.description].some((field) =>
          (field ? field.toLowerCase() : '').includes(searchTerm.toLowerCase())
        )
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm, products]);
  


  const handleProductClick = (productId: number) => {
    setSearchTerm(""); 
    router.push(`/products/${productId}`);
  };


  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
      setSearchTerm("");
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);


  const dynamicStyles: React.CSSProperties = searchTerm
    ? {
        position: "absolute",
        top: "calc(100% + 10px)",
        width: "100%",
        zIndex: 10,
      }
    : { display: "none" };

  return (
    <div ref={searchBarRef} className="relative w-full mt-2 ml-[500px] flex flex-col items-center">
      <div className="sticky top-0 z-50 w-full max-w-[500px]">
        <input
          className="rounded-md mt-4 h-8 w-full text-center mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Busca tu próxima compra"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div
        className="relative w-full max-w-[500px] flex flex-col items-center overflow-y-auto"
        style={dynamicStyles}
      >
        {searchTerm && filteredProducts.length === 0 ? (
          <div className="p-4 text-center bg-red-100 border border-red-500 text-red-700 rounded-md">
            <p className="font-medium">No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
        ) : (
          searchTerm &&
          filteredProducts.length > 0 && (
            <div
              className="flex flex-col w-full space-y-4 overflow-y-auto"
              style={{ maxHeight: "400px" }}
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="w-full max-w-[500px] cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                >
                  <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-[80px] h-[80px] object-contain mr-4"
                    />
                    <div className="flex flex-col justify-between">
                      <h3 className="font-bold">{product.name}</h3>
                      <div className="mt-2 flex items-center">
                        <span className="text-lg font-semibold text-blue-600">${product.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SearchBar;
