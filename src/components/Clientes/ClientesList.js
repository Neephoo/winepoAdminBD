import React from 'react';

const ClientesList = ({ clientes, onEdit, onDelete }) => (
  <table className="tabla">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Email</th>
        <th>Teléfono</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {clientes.map((cliente, index) => (
        <tr key={index}>
          <td>{cliente.nombre}</td>
          <td>{cliente.email}</td>
          <td>{cliente.telefono}</td>
          <td>
            <button onClick={() => onEdit(index)}>✏️</button>
            <button onClick={() => onDelete(index)}>🗑️</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ClientesList;
