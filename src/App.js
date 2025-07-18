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

