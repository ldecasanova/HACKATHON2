// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from  './components/NavBar';

// Páginas
import HomePage from './pages/HomePage';
import LoginPage from  './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductDetailsPage from './pages/ProductDetailPages';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />

            {/* Rutas protegidas para clientes */}
            <Route
              path="/cart"
              element={
                <PrivateRoute roles={['client']} element={<CartPage />} />
              }
            />

            {/* Rutas protegidas para administradores */}
            <Route
              path="/admin"
              element={
                <PrivateRoute roles={['admin']} element={<AdminPage />} />
              }
            />

            {/* Puedes agregar más rutas aquí */}
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;