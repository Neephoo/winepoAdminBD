import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside>
      <h1>🛒 Admin</h1>
      <nav>
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          🏠 Inicio
        </NavLink>
        <NavLink to="/clientes" className={({ isActive }) => (isActive ? 'active' : '')}>
          👥 Clientes
        </NavLink>
        <NavLink to="/ventas" className={({ isActive }) => (isActive ? 'active' : '')}>
          💰 Ventas
        </NavLink>
        <NavLink to="/pedidos" className={({ isActive }) => (isActive ? 'active' : '')}>
          🧾 Pedidos
        </NavLink>
        <NavLink to="/inventario" className={({ isActive }) => (isActive ? 'active' : '')}>
          📦 Inventario
        </NavLink>
        <NavLink to="/productos" className={({ isActive }) => (isActive ? 'active' : '')}>
          🛍️ Productos
        </NavLink>
        <NavLink to="/despachos" className={({ isActive }) => (isActive ? 'active' : '')}>
          🚚 Despachos
        </NavLink>
        <NavLink to="/descuentos" className={({ isActive }) => (isActive ? 'active' : '')}>
          🏷️ Descuentos
        </NavLink>
      </nav>
    </aside>
  );
}
