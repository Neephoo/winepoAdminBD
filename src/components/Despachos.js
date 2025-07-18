import React, { useState, useEffect } from 'react';
import db from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

const Despachos = () => {
  const [despachos, setDespachos] = useState([]);
  const [form, setForm] = useState({ cliente: '', direccion: '', comuna: '', estado: '' });
  const [modoEdicion, setModoEdicion] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const despachosRef = collection(db, "despachos");

  const obtenerDespachos = async () => {
    const snapshot = await getDocs(despachosRef);
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setDespachos(docs);
  };

  useEffect(() => {
    obtenerDespachos();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAgregar = async (e) => {
    e.preventDefault();
    if (!form.cliente || !form.direccion || !form.comuna || !form.estado) return;

    await addDoc(despachosRef, form);
    await obtenerDespachos();

    setForm({ cliente: '', direccion: '', comuna: '', estado: '' });
  };

  const handleEditar = (d) => {
    setModoEdicion(true);
    setIdEditar(d.id);
    setForm({
      cliente: d.cliente,
      direccion: d.direccion,
      comuna: d.comuna,
      estado: d.estado
    });
  };

  const handleActualizar = async (e) => {
    e.preventDefault();
    const despachoDoc = doc(db, "despachos", idEditar);
    await updateDoc(despachoDoc, form);
    await obtenerDespachos();

    setModoEdicion(false);
    setIdEditar(null);
    setForm({ cliente: '', direccion: '', comuna: '', estado: '' });
  };

  const handleEliminar = async (id) => {
    const confirm = window.confirm("¿Eliminar este despacho?");
    if (confirm) {
      await deleteDoc(doc(db, "despachos", id));
      await obtenerDespachos();
    }
  };

  return (
    <div className="page-container">
      <h2>🚚 Gestión de Despachos</h2>

      <form onSubmit={modoEdicion ? handleActualizar : handleAgregar} className="formulario">
        <input
          type="text"
          name="cliente"
          placeholder="Cliente"
          value={form.cliente}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={form.direccion}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="comuna"
          placeholder="Comuna"
          value={form.comuna}
          onChange={handleChange}
          required
        />
        <select
          name="estado"
          value={form.estado}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar estado</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En camino">En camino</option>
          <option value="Entregado">Entregado</option>
          <option value="Cancelado">Cancelado</option>
        </select>
        <button type="submit">{modoEdicion ? "Actualizar" : "Agregar"}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Dirección</th>
            <th>Comuna</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {despachos.map(d => (
            <tr key={d.id}>
              <td>{d.cliente}</td>
              <td>{d.direccion}</td>
              <td>{d.comuna}</td>
              <td>{d.estado}</td>
              <td>
                <button onClick={() => handleEditar(d)}>✏️</button>
                <button onClick={() => handleEliminar(d.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Despachos;
