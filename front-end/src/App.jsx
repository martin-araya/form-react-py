
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListaUsuarios from './ListaUsuarios';
import CrearUsuarios from './CrearUsuarios';
import Home from './Home';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lista/usuarios" element={<ListaUsuarios />} />
      <Route path="/crear/usuarios" element={<CrearUsuarios />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
