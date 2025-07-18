import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import App from './App';
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
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>🏠 Inicio</NavLink>
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

function Inicio() {
  return <h2>🏠 Bienvenido al Panel de Administración</h2>;
}
function Clientes() {
  return <h2>👥 Página Clientes</h2>;
}
function Ventas() {
  return <h2>💰 Página Ventas</h2>;
}
function Pedidos() {
  return <h2>🧾 Página Pedidos</h2>;
}
function Inventario() {
  return <h2>📦 Página Inventario</h2>;
}
function Productos() {
  return <h2>🛍️ Página Productos</h2>;
}
function Despachos() {
  return <h2>🚚 Página Despachos</h2>;
}
function Descuentos() {
  return <h2>🏷️ Página Descuentos</h2>;
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
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
  </BrowserRouter>
);
