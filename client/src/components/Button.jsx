import React from 'react';
import { useNavigate } from 'react-router';
const Button = (props) => {
  const navigate = useNavigate();
  return (
    <div className=' flex justify-center items-center flex-col gap-20'>
      <h1
        onClick={() => {
          navigate(`${props.path}`);
        }}
        className='bg-green-200 px-10 py-4 text-2xl '
      >
        {props.name}
      </h1>
    </div>
  );
};
export default Button;
