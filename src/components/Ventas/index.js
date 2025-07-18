import React, { useState } from 'react';
import VentasForm from './VentasForm';
import VentasList from './VentasList';

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [ventaEditar, setVentaEditar] = useState(null);
  const [editarIndex, setEditarIndex] = useState(null);

  const agregarOActualizarVenta = (venta) => {
    if (ventaEditar && editarIndex !== null) {
      const nuevasVentas = [...ventas];
      nuevasVentas[editarIndex] = venta;
      setVentas(nuevasVentas);
    } else {
      setVentas([...ventas, venta]);
    }
    setVentaEditar(null);
    setEditarIndex(null);
  };

  const eliminarVenta = (index) => {
    setVentas(ventas.filter((_, i) => i !== index));
  };

  const editarVenta = (index) => {
    setVentaEditar(ventas[index]);
    setEditarIndex(index);
  };

  return (
    <div className="ventas">
      <h2>💰 Ventas</h2>
      <VentasForm onSubmit={agregarOActualizarVenta} ventaEditar={ventaEditar} />
      <VentasList ventas={ventas} onEdit={editarVenta} onDelete={eliminarVenta} />
    </div>
  );
};

export default Ventas;
