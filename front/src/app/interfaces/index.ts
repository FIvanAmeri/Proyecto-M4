export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserData {
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface UserSession {
  login: boolean;
  token: string;
  user: UserSessionData; 
}

interface UserSessionData {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  role: string;
  credential: Credential;
  orders: Orders[];
}

export interface Orders {
  id: number;
  status?: string;
  date?: string;
  image?: string;
  product: Product[];
  userId: number;
}

interface Credential {
  id: number;
  password: string;
}
