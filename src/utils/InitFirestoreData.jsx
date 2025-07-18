import db from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export async function initFirestoreData() {
  try {
    // ========================
    // Colección: productos
    // ========================
    await addDoc(collection(db, "productos"), {
      nombre: "Vino Tinto Reserva",
      categoria: "Tintos",
      precio: 8990,
      stock: 100,
      descripcion: "Vino tinto reserva 2022, 750ml.",
    });

    // ========================
    // Colección: descuentos
    // ========================
    await addDoc(collection(db, "descuentos"), {
      nombre: "Descuento Invierno",
      porcentaje: 15,
      activo: true,
      fecha_inicio: "2025-07-01",
      fecha_fin: "2025-08-31",
    });

    // ========================
    // Colección: ventas
    // ========================
    await addDoc(collection(db, "ventas"), {
      cliente: "Juan Pérez",
      total: 17980,
      fecha: "2025-07-15",
      productos: [
        { nombre: "Vino Tinto Reserva", cantidad: 2, precio_unitario: 8990 },
      ],
    });

    // ========================
    // Colección: clientes
    // ========================
    await addDoc(collection(db, "clientes"), {
      nombre: "Juan Pérez",
      email: "juan.perez@gmail.com",
      telefono: "+56 9 1234 5678",
      direccion: "Av. Siempre Viva 742, Santiago",
    });

    // ========================
    // Colección: pedidos
    // ========================
    await addDoc(collection(db, "pedidos"), {
      cliente: "Juan Pérez",
      estado: "pendiente",
      fecha: "2025-07-16",
      productos: [
        { nombre: "Vino Tinto Reserva", cantidad: 2 },
      ],
    });

    // ========================
    // Colección: despachos
    // ========================
    await addDoc(collection(db, "despachos"), {
      pedidoId: "ejemplo123",
      direccion: "Av. Siempre Viva 742, Santiago",
      fechaDespacho: "2025-07-17",
      estado: "en tránsito",
    });

    console.log("✅ Datos iniciales cargados correctamente en Firestore.");
  } catch (error) {
    console.error("❌ Error al cargar datos iniciales:", error);
  }
}
