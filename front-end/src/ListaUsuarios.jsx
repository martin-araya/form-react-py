import { useEffect, useState } from 'react';
import axios from 'axios';

function ListaUsuarios() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/listar/usuario')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4'>
    <h1 className='text-4xl mb-8 font-bold text-gray-800'>Lista de usuarios</h1>
    {error && <p className='text-red-600'>{error}</p>}
    <div className='overflow-x-auto shadow-lg rounded-lg'>
        <table className='w-full text-sm text-left text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                <tr>
                    <th className='py-3 px-6'>id</th>
                    <th className='py-3 px-6'>Nombre</th>
                    <th className='py-3 px-6'>Edad</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={index} className='bg-white border-b hover:bg-gray-50'>
                        <td className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap'>{index + 1}</td>
                        <td className='py-4 px-6'>{user.name}</td>
                        <td className='py-4 px-6'>{user.age}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

  );
}

export default ListaUsuarios;
