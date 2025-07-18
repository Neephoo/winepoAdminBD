import React, { useState, useEffect } from 'react';

const PedidosForm = ({ onSubmit, pedidoEditar }) => {
  const [pedido, setPedido] = useState({
    cliente: '',
    producto: '',
    cantidad: 1,
    estado: 'Pendiente'
  });

  useEffect(() => {
    if (pedidoEditar) setPedido(pedidoEditar);
  }, [pedidoEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPedido({ ...pedido, [name]: name === 'cantidad' ? parseInt(value) : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(pedido);
    setPedido({ cliente: '', producto: '', cantidad: 1, estado: 'Pendiente' });
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <input
        name="cliente"
        placeholder="Cliente"
        value={pedido.cliente}
        onChange={handleChange}
        required
      />
      <input
        name="producto"
        placeholder="Producto"
        value={pedido.producto}
        onChange={handleChange}
        required
      />
      <input
        name="cantidad"
        type="number"
        min="1"
        value={pedido.cantidad}
        onChange={handleChange}
        required
      />
      <select name="estado" value={pedido.estado} onChange={handleChange}>
        <option value="Pendiente">Pendiente</option>
        <option value="Enviado">Enviado</option>
        <option value="Entregado">Entregado</option>
      </select>
      <button type="submit">{pedidoEditar ? 'Actualizar' : 'Agregar'} Pedido</button>
    </form>
  );
};

export default PedidosForm;
