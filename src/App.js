import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './index.css';
import Clientes from './components/Clientes';
import Productos from './components/Productos';
import Descuentos from './components/Descuentos';
import Despachos from './components/Despachos';
import Inventario from './components/Inventario';
import Ventas from './components/Ventas';
import Pedidos from './components/Pedidos';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

function Sidebar() {
  return (
    <aside>
      <h1>🛒 Admin</h1>
      <nav>
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>📊 Dashboard</NavLink>
        <NavLink to="/clientes" className={({ isActive }) => isActive ? 'active' : ''}>👥 Clientes</NavLink>
        <NavLink to="/ventas" className={({ isActive }) => isActive ? 'active' : ''}>💰 Ventas</NavLink>
        <NavLink to="/pedidos" className={({ isActive }) => isActive ? 'active' : ''}>🧾 Pedidos</NavLink>
        <NavLink to="/inventario" className={({ isActive }) => isActive ? 'active' : ''}>📦 Inventario</NavLink>
        <NavLink to="/productos" className={({ isActive }) => isActive ? 'active' : ''}>🛍️ Productos</NavLink>
        <NavLink to="/despachos" className={({ isActive }) => isActive ? 'active' : ''}>🚚 Despachos</NavLink>
        <NavLink to="/descuentos" className={({ isActive }) => isActive ? 'active' : ''}>🏷️ Descuentos</NavLink>
      </nav>
    </aside>
  );
}

export default function App() {
  return (
    <Router>
      <div id="root">
        <Sidebar />
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/ventas" element={<Ventas />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/despachos" element={<Despachos />} />
            <Route path="/descuentos" element={<Descuentos />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

