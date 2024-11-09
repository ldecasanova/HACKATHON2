// src/components/ProductList.tsx

import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/products';
import ProductCard from './ProductCard';

interface Product {
  itemId: string;
  title: string;
  price: number;
  imgUrl: string;
  stars: number;
  // Agrega más campos si es necesario
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [lastKey, setLastKey] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts(10, lastKey);
      setProducts((prev) => [...prev, ...data.items]);
      setLastKey(data.lastKey);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  const handleLoadMore = () => {
    fetchProducts();
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.itemId} product={product} />
        ))}
      </div>
      {lastKey && (
        <div className="text-center mt-6">
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Cargar más'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
