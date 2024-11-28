"use client";

import { usePathname } from 'next/navigation';
import Image from "next/image";

const Footer = () => {
  const pathname = usePathname();
  

  const isHomePage = pathname === '/';

  return (
    <footer
      id="contact-us"
      className={`bg-primary ${isHomePage ? 'mt-2' : 'mt-auto'} p-5 text-center relative w-full`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between mt-4 gap-4 sm:gap-10 w-full">
        <div className="flex items-center justify-center gap-4 sm:gap-10 w-full">
          <Image
            className="object-contain transition-all duration-1000 ease-in-out hover:animate-distort"
            src="https://www.pngplay.com/wp-content/uploads/9/Facebook-Logo-Transparent-PNG.png"
            alt="Facebook Icon"
            width={40}
            height={40}
          />
          <Image
            className="object-contain transition-all duration-1000 ease-in-out hover:animate-distort"
            src="https://png.pngtree.com/png-clipart/20230401/original/pngtree-three-dimensional-instagram-icon-png-image_9015419.png"
            alt="Instagram Icon"
            width={40}
            height={40}
          />
          <Image
            className="object-contain transition-all duration-1000 ease-in-out hover:animate-distort"
            src="https://static.vecteezy.com/system/resources/previews/023/986/926/non_2x/linkedin-logo-linkedin-logo-transparent-linkedin-icon-transparent-free-free-png.png"
            alt="LinkedIn Icon"
            width={40}
            height={40}
          />
          <Image
            className="object-contain transition-all duration-1000 ease-in-out hover:animate-distort"
            src="https://www.utadeo.edu.co/sites/tadeo/files/node/wysiwyg/twitter-x-logo-0339f999cf-seeklogo.com_.png"
            alt="Twitter Icon"
            width={40}
            height={40}
          />
        </div>

        <div className="flex items-center justify-center sm:justify-end gap-4 mt-4 sm:mt-0 w-full sm:w-auto sm:absolute sm:bottom-0 sm:right-0 sm:p-5">
          <div className="w-4 h-4 bg-quaternary rounded-full flex items-center justify-center text-white text-3xl font-semibold">
            ©
          </div>
          <span className="text-2xl font-semibold text-quaternary">
            Iván Ameri
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
