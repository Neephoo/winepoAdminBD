import React, { useState } from 'react';
import ClienteForm from './ClienteForm';
import ClientesList from './ClientesList';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [clienteEditar, setClienteEditar] = useState(null);
  const [editarIndex, setEditarIndex] = useState(null);

  const agregarOActualizarCliente = (cliente) => {
    if (clienteEditar && editarIndex !== null) {
      const nuevosClientes = [...clientes];
      nuevosClientes[editarIndex] = cliente;
      setClientes(nuevosClientes);
    } else {
      setClientes([...clientes, cliente]);
    }
    setClienteEditar(null);
    setEditarIndex(null);
  };

  const eliminarCliente = (index) => {
    const nuevosClientes = clientes.filter((_, i) => i !== index);
    setClientes(nuevosClientes);
  };

  const editarCliente = (index) => {
    setClienteEditar(clientes[index]);
    setEditarIndex(index);
  };

  return (
    <div className="clientes">
      <h2>👥 Clientes</h2>
      <ClienteForm onSubmit={agregarOActualizarCliente} clienteEditar={clienteEditar} />
      <ClientesList
        clientes={clientes}
        onEdit={editarCliente}
        onDelete={eliminarCliente}
      />
    </div>
  );
};

export default Clientes;
