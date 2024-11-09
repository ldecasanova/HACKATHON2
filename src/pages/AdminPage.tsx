// src/pages/AdminPage.tsx

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  Product,
} from '../services/products';
import ProductForm from '../components/ProductForm';

const AdminPage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(100);
        // Filtra los productos que pertenecen al administrador
        setProducts(data.items.filter((item: any) => item.ownerId === user?.username));
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [user]);

  const handleCreateOrUpdate = async (product: Product) => {
    try {
      if (user) {
        if (product.itemId) {
          await updateProduct(product, user.token);
        } else {
          await createProduct(product, user.token);
        }
        // Actualiza la lista de productos
        const data = await getProducts(100);
        setProducts(data.items.filter((item: any) => item.ownerId === user.username));
        setEditingProduct(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (itemId: string) => {
    try {
      if (user) {
        await deleteProduct(itemId, user.token);
        // Actualiza la lista de productos
        const data = await getProducts(100);
        setProducts(data.items.filter((item: any) => item.ownerId === user.username));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Panel de Administración</h2>
      {/* Formulario para crear o editar productos */}
      {/* Puedes crear un componente separado para el formulario */}
      {/* Lista de productos con opciones para editar o eliminar */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Título</th>
            <th className="py-2">Precio</th>
            <th className="py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.itemId}>
              <td className="py-2">{product.title}</td>
              <td className="py-2">${product.price.toFixed(2)}</td>
              <td className="py-2">
                <button
                  onClick={() => setEditingProduct(product)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.itemId!)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Formulario de edición o creación */}
      {editingProduct && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4">
            {editingProduct.itemId ? 'Editar Producto' : 'Crear Producto'}
          </h3>
          <ProductForm
            product={editingProduct}
            onSubmit={handleCreateOrUpdate}
            onCancel={() => setEditingProduct(null)}
          />
        </div>
      )}
      {!editingProduct && (
        <button
          onClick={() =>
            setEditingProduct({
              title: '',
              price: 0,
              imgUrl: '',
              stars: 0,
              boughtInLastMonth: 0,
              isBestSeller: false,
            })
          }
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
        >
          Crear Nuevo Producto
        </button>
      )}
    </div>
  );
};

export default AdminPage;