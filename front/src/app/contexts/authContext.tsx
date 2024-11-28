import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { Product, UserSession, Orders } from "@/app/interfaces";

interface AuthContextProps {
  user: UserSession | null;
  setUser: (user: UserSession | null) => void;
  logout: () => void;
  favorites: Product[];
  setFavorites: (favorites: Product[]) => void;
  orders: Orders[];
  setOrders: (orders: Orders[]) => void;
  addOrder: (newOrder: Orders) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  favorites: [],
  setUser: () => {},
  logout: () => {},
  setFavorites: () => {},
  orders: [],
  setOrders: () => {},
  addOrder: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Orders[]>([]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");

      if (storedUser) {
        setUser(storedUser);
        setOrders(storedOrders);
      }
    }
  }, [mounted]);

  useEffect(() => {
    if (mounted && user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [mounted, user]);

  useEffect(() => {
    if (mounted && orders.length > 0) {
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }, [mounted, orders]);

  const addOrder = (newOrder: Orders) => {
    if (user) {
      const updatedOrders = [...orders, { ...newOrder, userId: user.user.id }];
      setOrders(updatedOrders);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  if (!mounted) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout, favorites, setFavorites, orders, setOrders, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
};
