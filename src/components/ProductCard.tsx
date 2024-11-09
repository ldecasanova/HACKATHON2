import React from 'react';
import { Link } from 'react-router-dom';

interface Product {
  itemId: string;
  title: string;
  price: number;
  imgUrl: string;
  stars: number;
  // Agrega más campos si es necesario
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="border rounded shadow hover:shadow-lg p-4">
      <img
        src={product.imgUrl}
        alt={product.title}
        className="w-full h-48 object-cover mb-4"
      />
      <h3 className="font-bold text-lg">{product.title}</h3>
      <p className="text-gray-700">${product.price.toFixed(2)}</p>
      <div className="flex items-center mt-2">
        <div className="text-yellow-500">
          {'★'.repeat(product.stars)}
          {'☆'.repeat(5 - product.stars)}
        </div>
        <span className="text-gray-600 ml-2">{product.stars} / 5</span>
      </div>
      <Link
        to={`/product/${product.itemId}`}
        className="block bg-blue-500 text-white mt-4 p-2 text-center rounded hover:bg-blue-600"
      >
        Ver Detalles
      </Link>
    </div>
  );
};

export default ProductCard;
