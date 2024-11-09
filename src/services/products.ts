// src/services/products.ts

import axios from 'axios';

const API_URL = 'https://nn1h052dp5.execute-api.us-east-2.amazonaws.com/v1';

export interface Product {
  itemId?: string;
  title: string;
  price: number;
  imgUrl: string;
  stars: number;
  boughtInLastMonth: number;
  isBestSeller: boolean;
}

export const getProducts = async (limit: number, lastKey?: string) => {
  const response = await axios.get(`${API_URL}/items`, {
    params: { limit, lastKey },
  });
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await axios.get(`${API_URL}/item/${id}`);
  return response.data;
};

export const createProduct = async (product: Product, token: string) => {
  const response = await axios.post(`${API_URL}/item`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateProduct = async (product: Product, token: string) => {
  const response = await axios.put(`${API_URL}/item`, product, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteProduct = async (id: string, token: string) => {
  const response = await axios.delete(`${API_URL}/item/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
