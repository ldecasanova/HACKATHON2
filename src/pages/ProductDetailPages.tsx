// src/pages/ProductDetailsPage.tsx

import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/products';
import { CartContext } from '../context/CartContext';

interface Product {
  itemId: string;
  title: string;
  price: number;
  imgUrl: string;
  stars: number;
  boughtInLastMonth: number;
  isBestSeller: boolean;
}

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const data = await getProductById(id);
          setProduct(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Cargando...</div>;
  }

  const handleAddToCart = () => {
    addToCart(product.itemId);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row">
        <img
          src={product.imgUrl}
          alt={product.title}
          className="w-full md:w-1/2 h-64 object-cover"
        />
        <div className="md:ml-8 mt-4 md:mt-0">
          <h2 className="text-3xl font-bold">{product.title}</h2>
          <p className="text-gray-700 mt-2">${product.price.toFixed(2)}</p>
          <div className="flex items-center mt-2">
            <div className="text-yellow-500">
              {'★'.repeat(product.stars)}
              {'☆'.repeat(5 - product.stars)}
            </div>
            <span className="text-gray-600 ml-2">{product.stars} / 5</span>
          </div>
          {/* Agrega más detalles si es necesario */}
          <button
            onClick={handleAddToCart}
            className="bg-green-500 text-white mt-6 p-2 rounded hover:bg-green-600"
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
