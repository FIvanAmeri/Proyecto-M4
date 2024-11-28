"use client"

import Link from "next/link";

const Hero = () => {
    return (
        <header className="w-full max-w-[1200px] mx-auto h-[12.5rem] sm:h-[15rem] md:h-[20rem] lg:h-[25rem] flex items-center justify-center flex-col rounded-lg my-3 bg-hero bg-cover bg-center sm:px-6 px-4">
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center">Bienvenido</h2>
            <Link
                href="/products"
                className="border-4 hover:bg-lime-950 rounded-xl h-12 sm:h-14 md:h-16 lg:h-18 w-64 sm:w-72 md:w-80 lg:w-96 text-center mt-4 mb-4 border-t-red-500 border-r-green-500 border-b-sky-400 border-l-pink-300 hover:border-t-emerald-300 hover:border-r-sky-700 hover:border-b-pink-400 hover:border-l-green-500 flex items-center justify-center"
            >
                <span className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl hover:text-green-500">Tendencias</span>
            </Link>
        </header>
        
    );
}

export default Hero;
