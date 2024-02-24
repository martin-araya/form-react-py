import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mx-auto text-center flex justify-center items-center h-screen">
      <ul className="text-lg md:text-xl lg:text-3xl space-y-4">
        <li className="hover:text-blue-500 transition-colors duration-300">
          <Link to="/">Inicio</Link>
        </li>

        <li className="hover:text-blue-500 transition-colors duration-300">
          <Link to="/crear/usuarios">Crear Usuarios</Link>
        </li>
      
        <li className="hover:text-blue-500 transition-colors duration-300">
        <Link to="/lista/usuarios">Lista de Usuarios</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;
