'use client';

import Link from 'next/link';
import UserWidget from '../UserWidget/UserWidget';
import Logo from "../../../../assets/Logo.png";
import Image from 'next/image';
import { useState, useContext } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import { CartContext } from '@/app/contexts/cartContext';
import { AuthContext } from '@/app/contexts/authContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const homeImageUrl = 'https://static.vecteezy.com/system/resources/thumbnails/014/391/893/small_2x/home-icon-isolated-on-transparent-background-black-symbol-for-your-design-free-png.png';
  const [menuOpen, setMenuOpen] = useState(false);

  const { cart } = useContext(CartContext);
  const { user } = useContext(AuthContext); 
  const router = useRouter();

  const cartCount = cart?.length || 0;

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const scrollToFooter = () => {
    const footer = document.getElementById('contact-us');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToCart = () => {
    if (!user) {
      router.push('/login');
    } else {
      router.push('/cart');
    }
  };

  return (
    <nav className="bg-primary w-full">
      <div className="flex justify-between items-center h-16 px-4">
        <div className="flex items-center space-x-4">
          <Image
            src={Logo}
            alt="Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <Link href="/" className="flex items-center">
            <img
              src={homeImageUrl}
              alt="Home Icon"
              width={40}
              height={40}
              className="mr-2"
            />
          </Link>
        </div>

        <div className="flex justify-center flex-grow mx-4">
          <SearchBar />
        </div>

        <div className="hidden lg:flex items-center space-x-8">
          <div className="flex items-center ml-4">
            <div className="relative">
              <button onClick={goToCart}>
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/5412/5412512.png"
                  alt="Cart Icon"
                  width={30}
                  height={30}
                />
                {user && cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs px-2">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {user && (
            <Link href="/favorites" className="hover:text-red-600">
              Favoritos
            </Link>
          )}

          <Link href="/about" className="hover:text-red-600">
            Sobre nosotros
          </Link>
          <button onClick={scrollToFooter} className="hover:text-red-600">
            Contáctanos
          </button>
        </div>

        <div className="flex items-center ml-4">
          <UserWidget />
        </div>

        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="flex flex-col items-center lg:hidden bg-primary p-4 space-y-4">
          {user && (
            <Link href="/favorites" className="hover:text-red-600">
              Favoritos
            </Link>
          )}
          <Link href="/about" className="hover:text-red-600">
            Sobre nosotros
          </Link>
          <button onClick={scrollToFooter} className="hover:text-red-600">
            Contáctanos
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
