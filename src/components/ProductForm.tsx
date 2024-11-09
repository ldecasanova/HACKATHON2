// src/components/ProductForm.tsx

import React, { useState } from 'react';
import { Product } from '../services/products';

interface ProductFormProps {
  product: Product;
  onSubmit: (product: Product) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Product>(product);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700">Título</label>
        <input
          type="text"
          name="title"
          className="w-full mt-1 p-2 border rounded"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      {/* Agrega más campos según sea necesario */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
        >
          Cancelar
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Guardar
        </button>
      </div>
    </form>
  );
};

export default ProductForm;