import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Logout from './Logout';
import Create from './Create';
import { MdDelete } from 'react-icons/md';
const Authorised = () => {
  const [status, setStatus] = useState(false);
  const [Userdata, setUserData] = useState();
  const [todoData, setTodoData] = useState();
  console.log(import.meta.env.VITE_BACKEND_URL);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/v1/user`, {
        withCredentials: true,
      });
      setUserData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTodo = async () => {
    // console.log(Userdata.id);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/v1/view/${Userdata?.id}`,
        {
          withCredentials: true,
        }
      );
      setTodoData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (Userdata) {
      fetchTodo();
    }
  }, [Userdata]);

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/v1/delete/${id}`, {
        withCredentials: true,
      });
      console.log(response.data.message);
      fetchTodo();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteHandler = (id) => {
    deleteTodo(id);
  };
  // console.log(todoData && todoData.length);

  return (
    <div className='text-2xl bg-white text-black'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <img src='../../public/avatar.png' alt=' ' className='h-[120px] rounded-xl' />
          <div>
            <p>Hello!</p>
            <p>{Userdata && Userdata?.name}</p>
          </div>
        </div>

        <div>
          <Logout />
        </div>
      </div>
      <hr className='border-4' />
      <div>
        <p className='p-10 text-blue-400'>
          {todoData && todoData.length == 0 ? (
            <p>Seems like you've not tried out todo app! Create your task</p>
          ) : (
            ''
          )}
        </p>
      </div>

      <div className='flex  flex-wrap h-[auto]  gap-3  overflow-scroll'>
        {todoData &&
          todoData.map((item, index) => {
            return (
              <div
                className={`text-black font-bold h-auto bg-purple-100  m-10 p-10 w-[90%] flex  gap-9 items-center relative rounded-xl`}
                key={index}
              >
                <img src='../../public/todo.png' alt='' className='h-[100px]' />
                <div>
                  <h1 className='text-[25px]'>{item.title}</h1>
                  <h1>{item.description}</h1>
                </div>
                <div
                  className='absolute right-10 cursor-pointer'
                  onClick={() => {
                    deleteHandler(item?._id);
                  }}
                >
                  <MdDelete />
                </div>
              </div>
            );
          })}
      </div>
      <div
        className='fixed bottom-10 w-[100%] text-center text-[100px] cursor-pointer'
        onClick={() => {
          setStatus(true);
        }}
      >
        +
      </div>
      <div className={`bg-green-200 fixed bottom-0 w-[100%] ${status ? 'block' : 'hidden'}`}>
        <Create id={Userdata?.id} state={fetchTodo} show={setStatus} />
      </div>
    </div>
  );
};
export default Authorised;
