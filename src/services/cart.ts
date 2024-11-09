// src/services/cart.ts

import axios from 'axios';

const API_URL = 'https://nn1h052dp5.execute-api.us-east-2.amazonaws.com/v1';

export const addItemToCart = async (itemId: string, userId: string, token: string) => {
  const response = await axios.put(
    `${API_URL}/cart`,
    {
      itemId,
      userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getCartByUserId = async (userId: string, token: string) => {
  const response = await axios.get(`${API_URL}/cart/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
