import React, { useState, useEffect } from 'react';

const ClienteForm = ({ onSubmit, clienteEditar }) => {
  const [cliente, setCliente] = useState({ nombre: '', email: '', telefono: '' });

  useEffect(() => {
    if (clienteEditar) setCliente(clienteEditar);
  }, [clienteEditar]);

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cliente.nombre) return;
    onSubmit(cliente);
    setCliente({ nombre: '', email: '', telefono: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <input
        name="nombre"
        placeholder="Nombre"
        value={cliente.nombre}
        onChange={handleChange}
      />
      <input
        name="email"
        placeholder="Email"
        value={cliente.email}
        onChange={handleChange}
      />
      <input
        name="telefono"
        placeholder="Teléfono"
        value={cliente.telefono}
        onChange={handleChange}
      />
      <button type="submit">{clienteEditar ? 'Actualizar' : 'Agregar'} Cliente</button>
    </form>
  );
};

export default ClienteForm;
