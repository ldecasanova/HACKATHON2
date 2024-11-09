// src/context/CartContext.tsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { addItemToCart, getCartByUserId } from '../services/cart';

interface CartContextProps {
  cart: CartItem[];
  addToCart: (itemId: string) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
}

interface CartItem {
  itemId: string;
  qty: number;
}

export const CartContext = createContext<CartContextProps>({
  cart: [],
  addToCart: async () => {},
  removeFromCart: async () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const data = await getCartByUserId(user.username, user.token);
          setCart(data.products);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchCart();
  }, [user]);

  const addToCart = async (itemId: string) => {
    if (user) {
      try {
        await addItemToCart(itemId, user.username, user.token);
        const data = await getCartByUserId(user.username, user.token);
        setCart(data.products);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const removeFromCart = async (itemId: string) => {
    // Implementa la lógica para eliminar un item del carrito
    // No hay un endpoint específico, podrías manejarlo localmente o ajustar la API
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
