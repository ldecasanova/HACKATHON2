// src/components/Navbar.tsx

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">
        Mi Tienda
      </Link>
      <div>
        {user ? (
          <>
            {user.role === 'client' && (
              <Link to="/cart" className="mr-4">
                Carrito
              </Link>
            )}
            {user.role === 'admin' && (
              <Link to="/admin" className="mr-4">
                Admin
              </Link>
            )}
            <button onClick={logout}>Cerrar Sesión</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">
              Iniciar Sesión
            </Link>
            <Link to="/register">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
