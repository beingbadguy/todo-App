import React from 'react';
import { useNavigate } from 'react-router';
const App = () => {
  const navigate = useNavigate();
  return (
    <div className='h-[100vh] bg-white flex flex-col items-center '>
      <div>
        <img src='/front-page.png' alt='' />
      </div>
      <div className='text-center flex flex-col items-center w-[100%]'>
        <h1 className='font-bold text-2xl'>Task Management & To-Do List</h1>
        <p className='w-[80%] my-10'>
          The productive tool is designed to help you better manage your task project-wise
          conveniently!
        </p>
      </div>
      <div className='flex flex-col w-[90%] text-center gap-4 absolute bottom-0 mb-20'>
        <h1
          onClick={() => {
            navigate('/login');
          }}
          className='bg-green-200 px-10 py-4 text-2xl '
        >
          Login
        </h1>
        <h1
          onClick={() => {
            navigate('/sign');
          }}
          className='bg-red-200 px-10 py-4 text-2xl '
        >
          SignUp
        </h1>
      </div>
    </div>
  );
};
export default App;
