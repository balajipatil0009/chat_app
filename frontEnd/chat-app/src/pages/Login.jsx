import React, { useEffect, useState } from 'react';
import axios from '../modules/axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: '', pass: '' });

  const handleChange = (e) => {
    const name = e.target.name;
    setData({ ...data, [name]: e.target.value });
  };
  const handleToken = async () => {
    const token = await axios.get('/login');
    console.log(token.data);
  };
  useEffect(() => {
    handleToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.email && data.pass) {
      try {
        const res = await axios.post('/login', data);
        if (res) {
          navigate('/chats');
        }
        setData({ email: '', pass: '' });
      } catch (e) {
        navigate('/Error');
      }
    }
  };
  return (
    <>
      <form className="w-[40vw] h-[80vh]" onSubmit={handleSubmit}>
        <h3 className="text-center text-2xl">login page</h3>
        <div className="w-[60%] h-[60%] mx-[20%] my-[10%] border flex justify-center items-center">
          <div>
            <input
              type="text"
              name="email"
              placeholder="ENTER Email"
              className="border p-[2%] border-b-zinc-600 border-x-0 border-t-0 text-red-700"
              onChange={handleChange}
              value={data.email}
            />
            <br />
            <input
              type="text"
              name="pass"
              placeholder="ENTER Password"
              className="border p-[2%] border-b-zinc-600 border-x-0 border-t-0"
              onChange={handleChange}
              value={data.pass}
            />
            <br />
            <button
              type="submit"
              className="border p-2 rounded-md w-20 bg-slate-300 mt-6"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
