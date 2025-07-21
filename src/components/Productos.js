import React, { useEffect, useState } from "react";
import db from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
  });
  const [editandoId, setEditandoId] = useState(null);

  const productosRef = collection(db, "productos");

  const cargarProductos = async () => {
    const snapshot = await getDocs(productosRef);
    const lista = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProductos(lista);
  };

  const agregarProducto = async () => {
    if (!nuevoProducto.nombre || !nuevoProducto.precio) return;

    await addDoc(productosRef, {
      nombre: nuevoProducto.nombre,
      precio: parseFloat(nuevoProducto.precio),
      creadoEn: new Date(),
    });

    setNuevoProducto({ nombre: "", precio: "" });
    cargarProductos();
  };

  const actualizarProducto = async (id) => {
    const docRef = doc(db, "productos", id);
    await updateDoc(docRef, {
      nombre: nuevoProducto.nombre,
      precio: parseFloat(nuevoProducto.precio),
    });

    setNuevoProducto({ nombre: "", precio: "" });
    setEditandoId(null);
    cargarProductos();
  };

  const eliminarProducto = async (id) => {
    const docRef = doc(db, "productos", id);
    await deleteDoc(docRef);
    cargarProductos();
  };

  const comenzarEdicion = (producto) => {
    setEditandoId(producto.id);
    setNuevoProducto({
      nombre: producto.nombre,
      precio: producto.precio,
    });
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <div>
      <h1>Gestión de Productos</h1>

      <div className="formulario">
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nuevoProducto.nombre}
          onChange={(e) =>
            setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Precio"
          value={nuevoProducto.precio}
          onChange={(e) =>
            setNuevoProducto({ ...nuevoProducto, precio: e.target.value })
          }
        />
        {editandoId ? (
          <button onClick={() => actualizarProducto(editandoId)}>
            Actualizar
          </button>
        ) : (
          <button onClick={agregarProducto}>Agregar</button>
        )}
      </div>

      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.nombre}</td>
              <td>${prod.precio}</td>
              <td>
                <button onClick={() => comenzarEdicion(prod)}>Editar</button>
                <button onClick={() => eliminarProducto(prod.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Productos;
