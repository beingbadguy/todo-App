import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Button from './Button';

const Sign = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState();

  const [signData, setSignData] = useState({
    name: '',
    username: '',
    password: '',
  });
  const changeHandle = (e) => {
    const { name, value } = e.target;
    setSignData({
      ...signData,

      [name]: value,
    });
  };
  const signup = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/v1/sign`, signData);
      navigate('/login');
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.message);
      console.log('failed');
    }
  };

  const submitHandle = (e) => {
    e.preventDefault();
    if (signData.name == '' || signData.username == '' || signData.password == '') {
      setMessage('Enter all the details carefully');
    } else {
      signup();
    }
  };

  return (
    <div className='bg-black h-[100vh] bg-[url("/balloon.jpg")] bg-cover flex items-center justify-center '>
      <div
        className='absolute top-0 left-0 text-2xl text-white font-bold p-10'
        onClick={() => {
          navigate('/');
        }}
      >
        Home
      </div>
      <div className='flex flex-col w-[90%] items-center bg-white text-black p-10'>
        <h1 className='text-center text-2xl font-bold  my-4'>Sign Up</h1>
        <div>{message && <p className='text-red-500'>{message}</p>}</div>
        <form
          onSubmit={submitHandle}
          className=' flex flex-col w-[100%] gap-3 p-4 text-2xl gap-8 h-[50vh] '
        >
          <input
            className=' border border-black py-2 px-4'
            type='text'
            name='name'
            value={signData.name}
            id=''
            onChange={changeHandle}
            placeholder='Enter your name'
          />
          <input
            className=' border border-black py-2 px-4'
            type='text'
            name='username'
            value={signData.username}
            id=''
            onChange={changeHandle}
            placeholder='Enter your username'
          />
          <input
            className=' border border-black py-2 px-4'
            type='text'
            name='password'
            value={signData.password}
            id=''
            onChange={changeHandle}
            placeholder='Enter your password'
          />
          <button className='bg-green-200 p-4 ' type='submit'>
            Create new account
          </button>
        </form>
        <p className='text-xl my-4'>Already have an account?</p>
        <Button name='Log In' path='/login' />
      </div>
    </div>
  );
};
export default Sign;
