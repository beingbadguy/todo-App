import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Create = ({ id, state, show }) => {
  const [message, setMessage] = useState();
  const [todos, setTodos] = useState({
    title: '',
    description: '',
  });
  const changeHandle = (e) => {
    const { name, value } = e.target;
    setTodos({
      ...todos,

      [name]: value,
    });
  };
  const fetchTodo = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/v1/createTodo/${id}`,
        todos,
        {
          withCredentials: true,
        }
      );

      setMessage(response.data.message);
      state();
      setTodos({
        title: '',
        description: '',
      });
    } catch (error) {
      console.log(error.response.data.message);
      setMessage(error.response.data.message);
    }
  };

  const submitHandle = (e) => {
    e.preventDefault();
    if (todos.title == '' || todos.description == '') {
      alert('Please fill all the fields');
    } else {
      fetchTodo();
      show(false);
    }
  };
  useEffect(() => {}, []);

  return (
    <div className='bg-white '>
      <p
        className='text-center text-2xl cursor-pointer'
        onClick={() => {
          show(false);
        }}
      >
        X
      </p>
      <div className='text-black text-center text-sm'>{message}</div>
      <form
        onSubmit={submitHandle}
        className='flex flex-col w-[100%] gap-3 p-4 text-2xl text-black'
      >
        <input
          className='p-4 border border-black'
          type='text'
          name='title'
          value={todos.title}
          id=''
          onChange={changeHandle}
          placeholder='Enter title'
        />
        <textarea
          className='p-4 border border-black'
          type='text'
          name='description'
          value={todos.description}
          id=''
          onChange={changeHandle}
          placeholder='Enter description'
        />
        <button className='bg-green-200 p-4 font-bold' type='submit'>
          Create a new Todo
        </button>
      </form>
    </div>
  );
};
export default Create;
