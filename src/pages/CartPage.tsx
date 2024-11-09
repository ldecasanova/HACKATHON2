// src/pages/CartPage.tsx

import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { getProductById } from '../services/products';

interface CartItemDetail {
  itemId: string;
  qty: number;
  title: string;
  price: number;
  imgUrl: string;
}

const CartPage: React.FC = () => {
  const { cart } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState<CartItemDetail[]>([]);

  useEffect(() => {
    const fetchCartDetails = async () => {
      const details = await Promise.all(
        cart.map(async (item) => {
          const product = await getProductById(item.itemId);
          return {
            ...item,
            title: product.title,
            price: product.price,
            imgUrl: product.imgUrl,
          };
        })
      );
      setCartDetails(details);
    };
    fetchCartDetails();
  }, [cart]);

  const totalPrice = cartDetails.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Mi Carrito</h2>
      {cartDetails.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div>
          {cartDetails.map((item) => (
            <div key={item.itemId} className="flex items-center mb-4">
              <img src={item.imgUrl} alt={item.title} className="w-16 h-16 object-cover" />
              <div className="ml-4">
                <h3 className="font-bold">{item.title}</h3>
                <p>
                  ${item.price.toFixed(2)} x {item.qty}
                </p>
              </div>
              {/* Agrega botones para eliminar o modificar cantidad */}
            </div>
          ))}
          <p className="text-xl font-bold mt-4">Total: ${totalPrice.toFixed(2)}</p>
          <button className="bg-green-500 text-white mt-4 p-2 rounded hover:bg-green-600">
            Finalizar Compra
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
