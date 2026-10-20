
import React, { useState, useEffect } from 'react';
import { api } from '../api';

function FormularioVenta() {
  const [formData, setFormData] = useState({
    cliente_id: '',
    libro_id: '',
    cantidad: '',
    fecha: ''
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

    api.post('/ventas', {
      ...formData,
      cliente_id: Number(formData.cliente_id),
      libro_id: Number(formData.libro_id),
      cantidad: Number(formData.cantidad)
    })
      .then(res => {
        alert(res.data.message || 'Venta registrada correctamente');

        setFormData({
          cliente_id: '',
          libro_id: '',
          cantidad: '',
          fecha: ''
        });
      })
      .catch(err => {
        console.error('Error al registrar venta:', err);
        alert('No se pudo registrar la venta.');
      });
  };

  return (
    <div>
      <h2>Registrar Nueva Venta</h2>

      <form onSubmit={handleSubmit}>
        <select
          name="cliente_id"
          value={formData.cliente_id}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione cliente</option>
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
          <option value="">Seleccione libro</option>
          {libro.map(p => (
            <option key={p.id} value={p.id}>
              {p.nombre} - ${p.precio}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="cantidad"
          placeholder="Cantidad"
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

        <button type="submit">Registrar Venta</button>
      </form>
    </div>
  );
}

export default FormularioVenta;
