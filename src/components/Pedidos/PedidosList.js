import React from 'react';

const PedidosList = ({ pedidos, onEdit, onDelete }) => (
  <table className="tabla">
    <thead>
      <tr>
        <th>Cliente</th>
        <th>Producto</th>
        <th>Cantidad</th>
        <th>Estado</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {pedidos.map((pedido, index) => (
        <tr key={index}>
          <td>{pedido.cliente}</td>
          <td>{pedido.producto}</td>
          <td>{pedido.cantidad}</td>
          <td>{pedido.estado}</td>
          <td>
            <button onClick={() => onEdit(index)}>✏️</button>
            <button onClick={() => onDelete(index)}>🗑️</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default PedidosList;
