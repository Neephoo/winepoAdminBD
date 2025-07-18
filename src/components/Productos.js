import React, { useState, useEffect } from 'react';
import db from "../firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: '', precio: '', stock: '' });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoEditarId, setProductoEditarId] = useState(null);

  const productosRef = collection(db, "productos");

  // Cargar productos desde Firestore
  const cargarProductos = async () => {
    try {
      const snapshot = await getDocs(productosRef);
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProductos(lista);
    } catch (error) {
      console.error("Error cargando productos:", error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAgregar = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.precio || !form.stock) return;

    const nuevoProducto = {
      nombre: form.nombre,
      precio: parseInt(form.precio),
      stock: parseInt(form.stock)
    };

    try {
      await addDoc(productosRef, nuevoProducto);
      setForm({ nombre: '', precio: '', stock: '' });
      cargarProductos();
    } catch (error) {
      console.error("Error agregando producto:", error);
    }
  };

  const handleEditar = (producto) => {
    setModoEdicion(true);
    setProductoEditarId(producto.id);
    setForm({ nombre: producto.nombre, precio: producto.precio, stock: producto.stock });
  };

  const handleActualizar = async (e) => {
    e.preventDefault();
    if (!productoEditarId) return;

    const docRef = doc(db, "productos", productoEditarId);

    try {
      await updateDoc(docRef, {
        nombre: form.nombre,
        precio: parseInt(form.precio),
        stock: parseInt(form.stock)
      });
      setModoEdicion(false);
      setProductoEditarId(null);
      setForm({ nombre: '', precio: '', stock: '' });
      cargarProductos();
    } catch (error) {
      console.error("Error actualizando producto:", error);
    }
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm('¿Estás seguro de eliminar este producto?');
    if (!confirmar) return;

    try {
      const docRef = doc(db, "productos", id);
      await deleteDoc(docRef);
      cargarProductos();
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  return (
    <div className="page-container">
      <h2>🛍️ Gestión de Productos</h2>

      <form onSubmit={modoEdicion ? handleActualizar : handleAgregar} className="formulario">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del producto"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          required
        />
        <button type="submit">{modoEdicion ? 'Actualizar' : 'Agregar'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio ($)</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.precio.toLocaleString()}</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => handleEditar(p)}>✏️</button>
                <button onClick={() => handleEliminar(p.id)}>🗑️</button>
              </td>
            </tr>
          ))}
          {productos.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No hay productos registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Productos;
