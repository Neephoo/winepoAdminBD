import React from 'react';

const InventarioList = ({ productos, onEdit, onDelete }) => (
  <table className="tabla">
    <thead>
      <tr>
        <th>Producto</th>
        <th>Categoría</th>
        <th>Stock</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {productos.map((producto, index) => (
        <tr key={index}>
          <td>{producto.nombre}</td>
          <td>{producto.categoria}</td>
          <td>{producto.stock}</td>
          <td>
            <button onClick={() => onEdit(index)}>✏️</button>
            <button onClick={() => onDelete(index)}>🗑️</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default InventarioList;
