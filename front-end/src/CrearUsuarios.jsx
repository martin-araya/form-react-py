
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

function CrearUsuarios() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState(null); // Corregido para usar error
  const navigate = useNavigate(); // Inicializa useNavigate

  function handleSubmit(event) {
    event.preventDefault();
    // No necesitas redeclarar name y age aquí, ya que ya los tienes en el estado
    axios.post('http://localhost:5000/crear/usuario', { name, age })
      .then(() => {
        navigate('/lista/usuarios'); // Usa navigate para redireccionar
      })
      .catch(error => {
        setError(error.message); // Asegúrate de que setError esté correctamente definido
      });
  }

  return (
    <>
      <div className='container mx-auto flex justify-center items-center min-h-screen '>
    <div className='w-full max-w-xs '>
        <h1 className='text-4xl font-bold text-center mb-8'>Crear usuario</h1>
        <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="name">
                    Nombre
                </label>
                <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} 
                       className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
            </div>
            <div className='mb-6'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="age">
                    Edad
                </label>
                <input type="number" name="age" id="age" value={age} onChange={e => setAge(e.target.value)}
                       className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
            </div>
            <div className='flex items-center justify-center'>
                <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                    Crear usuario
                </button>
            </div>
        </form>
        {error && <p className='text-center text-red-500 text-xs'>{error}</p>}
    </div>
</div>

    </>
  );
}

export default CrearUsuarios;
