import React from 'react';
import { useNavigate } from 'react-router';
const Options = () => {
  const navigate = useNavigate();
  return (
    <div className='h-[100vh] bg-black  flex justify-center items-center flex-col gap-20'>
      <h1
        onClick={() => {
          navigate('/login');
        }}
        className='bg-green-200 px-10 py-4 text-4xl '
      >
        Login
      </h1>
      <h1
        onClick={() => {
          navigate('/sign');
        }}
        className='bg-red-200 px-10 py-4 text-4xl '
      >
        SignUp
      </h1>
    </div>
  );
};
export default Options;
