// src/pages/RegisterPage.tsx

import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const RegisterPage: React.FC = () => {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(username, password, role);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Registrarse</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Nombre de Usuario</label>
          <input
            type="text"
            className="w-full mt-1 p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            className="w-full mt-1 p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Rol</label>
          <select
            className="w-full mt-1 p-2 border rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="client">Cliente</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
