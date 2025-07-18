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
