import React, { useState, useEffect } from 'react';

const InventarioForm = ({ onSubmit, productoEditar }) => {
  const [producto, setProducto] = useState({ nombre: '', categoria: '', stock: '' });

  useEffect(() => {
    if (productoEditar) setProducto(productoEditar);
  }, [productoEditar]);

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!producto.nombre) return;
    onSubmit(producto);
    setProducto({ nombre: '', categoria: '', stock: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <input
        name="nombre"
        placeholder="Nombre del producto"
        value={producto.nombre}
        onChange={handleChange}
      />
      <input
        name="categoria"
        placeholder="Categoría"
        value={producto.categoria}
        onChange={handleChange}
      />
      <input
        name="stock"
        type="number"
        placeholder="Stock"
        value={producto.stock}
        onChange={handleChange}
      />
      <button type="submit">{productoEditar ? 'Actualizar' : 'Agregar'} Producto</button>
    </form>
  );
};

export default InventarioForm;
