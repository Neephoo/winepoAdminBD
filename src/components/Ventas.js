import React, { useState, useEffect } from 'react';
import db from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Ventas = () => {
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [venta, setVenta] = useState({
    clienteId: '',
    productosVendidos: [],
    productoId: '',
    cantidad: 1
  });
  const [ventas, setVentas] = useState([]);

  const productosRef = collection(db, "productos");
  const clientesRef = collection(db, "clientes");
  const ventasRef = collection(db, "ventas");

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

  // Cargar clientes desde Firestore
  const cargarClientes = async () => {
    try {
      const snapshot = await getDocs(clientesRef);
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setClientes(lista);
    } catch (error) {
      console.error("Error cargando clientes:", error);
    }
  };

  // Cargar ventas desde Firestore
  const cargarVentas = async () => {
    try {
      const snapshot = await getDocs(ventasRef);
      const lista = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Ordenar ventas por fecha descendente (opcional)
      lista.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      setVentas(lista);
    } catch (error) {
      console.error("Error cargando ventas:", error);
    }
  };

  useEffect(() => {
    cargarProductos();
    cargarClientes();
    cargarVentas();
  }, []);

  const agregarProducto = () => {
    const producto = productos.find(p => p.id === venta.productoId);
    if (!producto) return;

    setVenta(prev => ({
      ...prev,
      productosVendidos: [...prev.productosVendidos, {
        productoId: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: parseInt(venta.cantidad)
      }],
      productoId: '',
      cantidad: 1
    }));
  };

  const calcularTotal = () => {
    return venta.productosVendidos.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };

  const registrarVenta = async () => {
    if (!venta.clienteId || venta.productosVendidos.length === 0) {
      alert('Debes seleccionar un cliente y al menos un producto.');
      return;
    }

    const clienteSeleccionado = clientes.find(c => c.id === venta.clienteId);
    if (!clienteSeleccionado) {
      alert('Cliente no válido.');
      return;
    }

    const nuevaVenta = {
      cliente: clienteSeleccionado.nombre,
      productos: venta.productosVendidos,
      total: calcularTotal(),
      fecha: new Date().toISOString()
    };

    try {
      await addDoc(ventasRef, nuevaVenta);
      setVenta({ clienteId: '', productosVendidos: [], productoId: '', cantidad: 1 });
      cargarVentas();
    } catch (error) {
      console.error("Error registrando venta:", error);
      alert("Error al registrar la venta.");
    }
  };

  return (
    <div className="page-container">
      <h2>🧾 Registro de Ventas</h2>

      <div>
        <label>Cliente: </label>
        <select
          value={venta.clienteId}
          onChange={(e) => setVenta({ ...venta, clienteId: e.target.value })}
        >
          <option value="">Seleccione un cliente</option>
          {clientes.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Producto: </label>
        <select
          value={venta.productoId}
          onChange={(e) => setVenta({ ...venta, productoId: e.target.value })}
        >
          <option value="">Seleccione un producto</option>
          {productos.map(p => (
            <option key={p.id} value={p.id}>{p.nombre} - ${p.precio.toLocaleString()}</option>
          ))}
        </select>

        <input
          type="number"
          value={venta.cantidad}
          min="1"
          onChange={(e) => setVenta({ ...venta, cantidad: e.target.value })}
        />
        <button type="button" onClick={agregarProducto}>Agregar producto</button>
      </div>

      <div>
        <h4>🧺 Productos en esta venta</h4>
        <ul>
          {venta.productosVendidos.map((item, idx) => (
            <li key={idx}>
              {item.nombre} x{item.cantidad} = ${ (item.precio * item.cantidad).toLocaleString() }
            </li>
          ))}
        </ul>
        <strong>Total: ${calcularTotal().toLocaleString()}</strong>
      </div>

      <button onClick={registrarVenta}>💾 Registrar Venta</button>

      <hr />

      <h3>📈 Ventas Recientes</h3>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Productos</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(v => (
            <tr key={v.id}>
              <td>{new Date(v.fecha).toLocaleString()}</td>
              <td>{v.cliente}</td>
              <td>
                {v.productos.map((p, i) => (
                  <div key={i}>{p.nombre} x{p.cantidad}</div>
                ))}
              </td>
              <td>${v.total.toLocaleString()}</td>
            </tr>
          ))}
          {ventas.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>No hay ventas registradas.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Ventas;
