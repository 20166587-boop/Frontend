
import React, { useState, useEffect } from 'react';
import { api } from '../api';

function EditarVenta({ venta, onUpdate }) {
  const [formData, setFormData] = useState({
    cliente_id: venta.cliente_id,
    libro_id: venta.libro_id,
    cantidad: venta.cantidad,
    fecha: String(venta.fecha).slice(0, 10)
  });

  const [cliente, setCliente] = useState([]);
  const [libro, setLibro] = useState([]);

  useEffect(() => {
    api.get('/cliente')
      .then(res => setCliente(res.data))
      .catch(err => console.error('Error al cargar clientes:', err));

    api.get('/libro')
      .then(res => setLibro(res.data))
      .catch(err => console.error('Error al cargar libros:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api.put(`/ventas/${venta.id}`, {
      ...formData,
      cliente_id: Number(formData.cliente_id),
      libro_id: Number(formData.libro_id),
      cantidad: Number(formData.cantidad)
    })
      .then(res => {
        alert(res.data.message || 'Venta actualizada correctamente');
        onUpdate();
      })
      .catch(err => {
        console.error('Error al actualizar venta:', err);
        alert('No se pudo actualizar la venta.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        name="cliente_id"
        value={formData.cliente_id}
        onChange={handleChange}
        required
      >
        {cliente.map(e => (
          <option key={e.id} value={e.id}>
            {e.nombre} - {e.carnet}
          </option>
        ))}
      </select>

      <select
        name="libro_id"
        value={formData.libro_id}
        onChange={handleChange}
        required
      >
        {libro.map(p => (
          <option key={p.id} value={p.id}>
            {p.nombre} - ${p.precio}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="cantidad"
        min="1"
        value={formData.cantidad}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="fecha"
        value={formData.fecha}
        onChange={handleChange}
        required
      />

      <button type="submit">Actualizar Venta</button>
    </form>
  );
}

export default EditarVenta;
