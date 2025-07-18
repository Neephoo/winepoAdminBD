import React, { useState, useEffect } from 'react';

const VentasForm = ({ onSubmit, ventaEditar }) => {
  const [venta, setVenta] = useState({ cliente: '', producto: '', cantidad: 1, total: 0 });

  useEffect(() => {
    if (ventaEditar) {
      setVenta(ventaEditar);
    }
  }, [ventaEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenta({ ...venta, [name]: name === 'cantidad' ? parseInt(value) : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const precioUnitario = 5000; // Simulación de precio
    const total = venta.cantidad * precioUnitario;
    onSubmit({ ...venta, total });
    setVenta({ cliente: '', producto: '', cantidad: 1, total: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <input
        name="cliente"
        placeholder="Nombre del cliente"
        value={venta.cliente}
        onChange={handleChange}
        required
      />
      <input
        name="producto"
        placeholder="Producto vendido"
        value={venta.producto}
        onChange={handleChange}
        required
      />
      <input
        name="cantidad"
        type="number"
        min="1"
        value={venta.cantidad}
        onChange={handleChange}
        required
      />
      <button type="submit">{ventaEditar ? 'Actualizar' : 'Registrar'} Venta</button>
    </form>
  );
};

export default VentasForm;
