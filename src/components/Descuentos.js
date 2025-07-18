import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import db from "../firebase";

export default function Descuentos() {
  const [descuentos, setDescuentos] = useState([]);
  const [nuevoDescuento, setNuevoDescuento] = useState({
    titulo: "",
    descripcion: "",
    porcentaje: "",
    fecha_inicio: "",
    fecha_fin: "",
  });

  // Cargar descuentos desde Firebase
  useEffect(() => {
    const fetchDescuentos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "descuentos"));
        const lista = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDescuentos(lista);
      } catch (error) {
        console.error("Error al obtener los descuentos:", error);
      }
    };

    fetchDescuentos();
  }, []);

  // Agregar nuevo descuento
  const handleAgregar = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "descuentos"), {
        ...nuevoDescuento,
        porcentaje: parseFloat(nuevoDescuento.porcentaje),
      });
      setNuevoDescuento({
        titulo: "",
        descripcion: "",
        porcentaje: "",
        fecha_inicio: "",
        fecha_fin: "",
      });
      // Recargar lista
      const querySnapshot = await getDocs(collection(db, "descuentos"));
      const lista = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDescuentos(lista);
    } catch (error) {
      console.error("Error al agregar descuento:", error);
    }
  };

  return (
    <div className="container">
      <h1>🏷️ Descuentos</h1>

      <form onSubmit={handleAgregar} className="form">
        <input
          type="text"
          placeholder="Título"
          value={nuevoDescuento.titulo}
          onChange={(e) => setNuevoDescuento({ ...nuevoDescuento, titulo: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={nuevoDescuento.descripcion}
          onChange={(e) => setNuevoDescuento({ ...nuevoDescuento, descripcion: e.target.value })}
        />
        <input
          type="number"
          placeholder="Porcentaje"
          value={nuevoDescuento.porcentaje}
          onChange={(e) => setNuevoDescuento({ ...nuevoDescuento, porcentaje: e.target.value })}
          required
        />
        <input
          type="date"
          value={nuevoDescuento.fecha_inicio}
          onChange={(e) => setNuevoDescuento({ ...nuevoDescuento, fecha_inicio: e.target.value })}
          required
        />
        <input
          type="date"
          value={nuevoDescuento.fecha_fin}
          onChange={(e) => setNuevoDescuento({ ...nuevoDescuento, fecha_fin: e.target.value })}
          required
        />
        <button type="submit">Agregar Descuento</button>
      </form>

      <ul className="list">
        {descuentos.map((d) => (
          <li key={d.id}>
            <strong>{d.titulo}</strong> - {d.porcentaje}%<br />
            {d.descripcion}<br />
            📅 {d.fecha_inicio} → {d.fecha_fin}
          </li>
        ))}
      </ul>
    </div>
  );
}
