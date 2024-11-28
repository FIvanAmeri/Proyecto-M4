import Link from 'next/link';

const Category = () => {
  return (
    <div className="flex space-x-4 items-center p-4 bg-gray-100 justify-center">
      <Link href="/products/1" className="hover:text-red-300">Celulares</Link>
      <Link href="/products/2" className="hover:text-red-300">Notebooks</Link>
      <Link href="/products/3" className="hover:text-red-300">I Pad</Link>
      <Link href="/products/4" className="hover:text-red-300">Relojes</Link>
      <Link href="/products/5" className="hover:text-red-300">Auriculares</Link>
      <Link href="/products/6" className="hover:text-red-300">Parlantes</Link>
    </div>
  );
};

export default Category;
