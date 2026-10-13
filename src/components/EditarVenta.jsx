import React, { useState, useEffect } from 'react';
import axios from 'axios';
function EditarVenta({ venta, onUpdate }) {
const [formData, setFormData] = useState({
cliente_id: venta.cliente_id,
libro_id: venta.libro_id,
cantidad: venta.cantidad,
fecha: venta.fecha
});
const [cliente, setCliente] = useState([]);
const [libro, setLibro] = useState([]);
useEffect(() => {
axios.get('http://localhost:3000/cliente')
.then(res => setCliente(res.data))
.catch(err => console.error(err));
axios.get('http://localhost:3000/libro')
.then(res => setLibro(res.data))
.catch(err => console.error(err));
}, []);
const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value
});
};
const handleSubmit = (e) => {
e.preventDefault();
axios.put(`http://localhost:3000/ventas/${venta.id}`, formData)
.then(res => {
alert(res.data.message);
onUpdate(); // refresca la lista de ventas
})
.catch(err => console.error('Error al actualizar venta:', err));
};
return (
<form onSubmit={handleSubmit}>
<select name="cliente_id" value={formData.cliente_id}
onChange={handleChange} required>
{cliente.map(e => (
<option key={e.id} value={e.id}>{e.nombre} - {e.carnet}</option>
))}
</select>
<select name="libro_id" value={formData.libro_id}
onChange={handleChange} required>
{libro.map(p => (
<option key={p.id} value={p.id}>{p.nombre} -
${p.precio}</option>
))}
</select>
<input type="number" name="cantidad" value={formData.cantidad}
onChange={handleChange} required />
<input type="date" name="fecha" value={formData.fecha}
onChange={handleChange} required />
<button type="submit">Actualizar Venta</button>
</form>
);}
export default EditarVenta;