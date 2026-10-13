import React, { useState, useEffect } from 'react';
import axios from 'axios';
//useState: permite guardar datos y actualizar su valor. useEffect: permite ejecutar acciones cuando se carga el componente. axios: permite enviar solicitudes al servidor para obtener o guardar información.//

function FormularioVenta() {
const [formData, setFormData] = useState({
cliente_id: '',
libro_id: '',
cantidad: '',
fecha: ''
});
//Aquí se guardan los datos que el usuario introduce en el formulario.//

const [cliente, setCliente] = useState([]);
const [libro, setLibro] = useState([]);
// Estas variables guardan las listas que se mostrarán en los menús desplegables. estudiantes: almacena los estudiantes obtenidos del servidor. productos: almacena los productos disponibles.

useEffect(() => {
axios.get('http://localhost:3000/cliente')
.then(res => setCliente(res.data))
.catch(err => console.error(err));
axios.get('http://localhost:3000/libro')
.then(res => setLibro(res.data))
.catch(err => console.error(err));
}, []);
//aqui es donde se conecta con backend, 

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value
});
};
//Detectar los cambios del formulario

const handleSubmit = (e) => {
e.preventDefault();
axios.post('http://localhost:3000/ventas', formData)
.then(res => {
alert(res.data.message);
setFormData({ 
    cliente_id: '', 
    libro_id: '', 
    cantidad: '',
    fecha: '' });
})
.catch(err => 
    console.error('Error al registrar venta:', err));
};
//Registrar una venta. Se ejecuta cuando presionas el botón “Registrar Venta”.
return (
<div>

<h2>Registrar Nueva Venta</h2>
<form onSubmit={handleSubmit}>
<select name="cliente_id" value={formData.cliente_id}
onChange={handleChange} required>
<option value="">Seleccione cliente</option>
{cliente.map(e => ( //map() es la encargada de recorrer la lista de estudiantes del sistema y crea una opción por cada uno.
<option key={e.id} value={e.id}>{e.nombre} -
{e.carnet}</option> //aqui es donde la pagina muestra los campos, creando el menu desplegable de estudiantes que aparece en "seleccione estudiantes"
))} 
</select>


<select name="libro_id" value={formData.libro_id}//Lo mismo ocurre con el menú de productos
onChange={handleChange} required>
<option value="">Seleccione libro</option>
{libro.map(p => (
<option key={p.id} value={p.id}>{p.nombre} -
${p.precio}</option>))} 
</select>


<input type="number" name="cantidad" placeholder="Cantidad"//Los siguientes campos permiten ingresar la cantidad y la fecha:
value={formData.cantidad} onChange={handleChange} required />
<input type="date" name="fecha" value={formData.fecha}
onChange={handleChange} required />

<button type="submit">Registrar Venta</button>
</form>
</div>//Y el botón envía el formulario:
);
}
export default FormularioVenta;