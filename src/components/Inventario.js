import React, { useState, useEffect } from 'react';
import db from "../firebase";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";

const Inventario = () => {
  const [productos, setProductos] = useState([]);
  const [movimiento, setMovimiento] = useState({
    productoId: '',
    tipo: 'entrada',
    cantidad: 1
  });

  const productosRef = collection(db, "inventario");

  // Cargar productos desde Firebase
  const cargarProductos = async () => {
    const snapshot = await getDocs(productosRef);
    const lista = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setProductos(lista);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovimiento(prev => ({ ...prev, [name]: value }));
  };

  const registrarMovimiento = async (e) => {
    e.preventDefault();
    const cantidad = parseInt(movimiento.cantidad);
    if (isNaN(cantidad) || cantidad <= 0) {
      alert('La cantidad debe ser mayor a 0.');
      return;
    }

    const producto = productos.find(p => p.id === movimiento.productoId);
    if (!producto) {
      alert('Producto no encontrado.');
      return;
    }

    const nuevoStock =
      movimiento.tipo === 'entrada'
        ? producto.stock + cantidad
        : producto.stock - cantidad;

    if (nuevoStock < 0) {
      alert('No hay suficiente stock.');
      return;
    }

    // Actualizar en Firebase
    const productoRef = doc(db, "inventario", producto.id);
    await updateDoc(productoRef, { stock: nuevoStock });

    // Refrescar
    cargarProductos();
    setMovimiento({ productoId: '', tipo: 'entrada', cantidad: 1 });
  };

  return (
    <div className="page-container">
      <h2>📦 Gestión de Inventario</h2>

      <form onSubmit={registrarMovimiento} className="formulario">
        <select
          name="productoId"
          value={movimiento.productoId}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona un producto</option>
          {productos.map(p => (
            <option key={p.id} value={p.id}>{p.nombre}</option>
          ))}
        </select>

        <select
          name="tipo"
          value={movimiento.tipo}
          onChange={handleChange}
        >
          <option value="entrada">Entrada</option>
          <option value="salida">Salida</option>
        </select>

        <input
          type="number"
          name="cantidad"
          value={movimiento.cantidad}
          onChange={handleChange}
          min="1"
          required
        />
        <button type="submit">Registrar</button>
      </form>

      <h3>📋 Estado Actual del Inventario</h3>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id} style={{ backgroundColor: p.stock <= 5 ? '#ffe5e5' : 'transparent' }}>
              <td>{p.nombre}</td>
              <td>
                {p.stock} {p.stock <= 5 && <span style={{ color: 'red' }}>⚠️ Bajo</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventario;
