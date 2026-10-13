
import React from 'react';
import './App.css'; //(estilos)
import ListaVentas from './components/ListaVentas';//(lista de venta)
import FormularioVenta from './components/FormularioVenta';//(componentes del formulario)
function App() {
  return (
    <div>
      <h1>Biblioteca</h1>
      <FormularioVenta />
      <ListaVentas />
    </div>
  );
}

export default App;