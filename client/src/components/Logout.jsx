import React from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/v1/logout`, {
        withCredentials: true,
      });
      console.log(response);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={handleLogout} className='bg-pink-100 p-4 m-10 rounded'>
        Logout
      </button>
    </div>
  );
};
export default Logout;
