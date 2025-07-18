import React, { useState } from 'react';
import InventarioForm from './InventarioForm';
import InventarioList from './InventarioList';

const Inventario = () => {
  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);
  const [editarIndex, setEditarIndex] = useState(null);

  const agregarOActualizarProducto = (producto) => {
    if (productoEditar && editarIndex !== null) {
      const nuevos = [...productos];
      nuevos[editarIndex] = producto;
      setProductos(nuevos);
    } else {
      setProductos([...productos, producto]);
    }
    setProductoEditar(null);
    setEditarIndex(null);
  };

  const eliminarProducto = (index) => {
    setProductos(productos.filter((_, i) => i !== index));
  };

  const editarProducto = (index) => {
    setProductoEditar(productos[index]);
    setEditarIndex(index);
  };

  return (
    <div className="inventario">
      <h2>📦 Inventario</h2>
      <InventarioForm onSubmit={agregarOActualizarProducto} productoEditar={productoEditar} />
      <InventarioList productos={productos} onEdit={editarProducto} onDelete={eliminarProducto} />
    </div>
  );
};

export default Inventario;
