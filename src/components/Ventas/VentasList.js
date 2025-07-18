import React from 'react';

const VentasList = ({ ventas, onEdit, onDelete }) => (
  <table className="tabla">
    <thead>
      <tr>
        <th>Cliente</th>
        <th>Producto</th>
        <th>Cantidad</th>
        <th>Total</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {ventas.map((venta, index) => (
        <tr key={index}>
          <td>{venta.cliente}</td>
          <td>{venta.producto}</td>
          <td>{venta.cantidad}</td>
          <td>${venta.total}</td>
          <td>
            <button onClick={() => onEdit(index)}>✏️</button>
            <button onClick={() => onDelete(index)}>🗑️</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default VentasList;
