import React, { useEffect, useState } from 'react';
import db from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '', direccion: '', comuna: '' });
  const [editarId, setEditarId] = useState(null);

  const clientesCollection = collection(db, "clientes");

  // Cargar clientes desde Firebase
  const cargarClientes = async () => {
    const snapshot = await getDocs(clientesCollection);
    const lista = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setClientes(lista);
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const manejarCambio = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const guardarCliente = async (e) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
      alert('El nombre es obligatorio');
      return;
    }

    try {
      if (editarId) {
        const clienteRef = doc(db, "clientes", editarId);
        await updateDoc(clienteRef, formData);
        setEditarId(null);
      } else {
        await addDoc(clientesCollection, formData);
      }

      setFormData({ nombre: '', email: '', telefono: '', direccion: '', comuna: '' });
      cargarClientes();
    } catch (error) {
      console.error("Error al guardar el cliente:", error);
    }
  };

  const editarCliente = (cliente) => {
    setEditarId(cliente.id);
    setFormData({
      nombre: cliente.nombre,
      email: cliente.email,
      telefono: cliente.telefono,
      direccion: cliente.direccion,
      comuna: cliente.comuna,
    });
  };

  const eliminarCliente = async (id) => {
    if (window.confirm('¿Seguro quieres eliminar este cliente?')) {
      try {
        await deleteDoc(doc(db, "clientes", id));
        cargarClientes();
      } catch (error) {
        console.error("Error al eliminar cliente:", error);
      }
    }
  };

  return (
    <div>
      <h2>👥 Gestión de Clientes</h2>

      <form onSubmit={guardarCliente} style={{ marginBottom: '1.5rem' }}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={manejarCambio}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={manejarCambio}
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Número de teléfono"
          value={formData.telefono}
          onChange={manejarCambio}
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={formData.direccion}
          onChange={manejarCambio}
        />
        <input
          type="text"
          name="comuna"
          placeholder="Comuna"
          value={formData.comuna}
          onChange={manejarCambio}
        />
        <button type="submit">{editarId ? 'Actualizar Cliente' : 'Agregar Cliente'}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Comuna</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.nombre}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.direccion}</td>
              <td>{cliente.comuna}</td>
              <td>
                <button onClick={() => editarCliente(cliente)} style={{ marginRight: 8 }}>Editar</button>
                <button onClick={() => eliminarCliente(cliente.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
          {clientes.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>No hay clientes registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
