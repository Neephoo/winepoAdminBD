import React, { useState } from 'react';
import PedidosForm from './PedidosForm';
import PedidosList from './PedidosList';

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoEditar, setPedidoEditar] = useState(null);
  const [editarIndex, setEditarIndex] = useState(null);

  const agregarOActualizarPedido = (pedido) => {
    if (pedidoEditar && editarIndex !== null) {
      const nuevosPedidos = [...pedidos];
      nuevosPedidos[editarIndex] = pedido;
      setPedidos(nuevosPedidos);
    } else {
      setPedidos([...pedidos, pedido]);
    }
    setPedidoEditar(null);
    setEditarIndex(null);
  };

  const eliminarPedido = (index) => {
    setPedidos(pedidos.filter((_, i) => i !== index));
  };

  const editarPedido = (index) => {
    setPedidoEditar(pedidos[index]);
    setEditarIndex(index);
  };

  return (
    <div className="pedidos">
      <h2>🧾 Pedidos</h2>
      <PedidosForm onSubmit={agregarOActualizarPedido} pedidoEditar={pedidoEditar} />
      <PedidosList pedidos={pedidos} onEdit={editarPedido} onDelete={eliminarPedido} />
    </div>
  );
};

export default Pedidos;
