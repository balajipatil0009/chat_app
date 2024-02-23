// import data from '../assets/data.json';
import PriChat from './PriChat';
import Names from './Names';
import { useNavigate } from 'react-router-dom';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from '../modules/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import io from 'socket.io-client';
// import { log } from 'console';
const socket = io('http://localhost:3000');

const Chats = () => {
  //in this page we having issue of twice execution of useeffect that why we removed SRICT Mode
  const navigate = useNavigate();
  const [msg, setMsg] = useState(null);
  const [newData, setNewData] = useState();
  const [data, setData] = useState();
  const [userId, setUserId] = useState(null);
  const [chatWith, setChatWith] = useState(null);
  const [selected, setSelected] = useState(null);

  const authUser = async () => {
    const res = await axios.get('/auth');
    if (res) {
      if (res.status != 200) {
        return navigate('/login');
        // // console.log(res);
      }
      setUserId(res.data.userId);
      socket.emit('auth', res.data.userId);
      socket.on('priviousChats', async (oldChats) => {
        if (oldChats) {
          // console.log(oldChats);
          setData(oldChats);
        }
      });
    }
  };

  useEffect(() => {
    authUser();
  }, []);
  useEffect(() => {
    socket.on('privateMasssage', (msgData) => {
      const updatedChats = data.map((item) => {
        console.log(item.id == selected);
        if (true) {
          return { ...item, chats: [...item.chats, msgData] };
        } else {
          return item;
        }
      });
      setData(updatedChats);
    });
  }, [socket]);

  const handleSubmit = async (e) => {
    //I have to check cookie userID in  database and then save chat by finding the array of members.
    if (msg) {
      const auth = await axios.get('/auth');
      if (auth.data.userId == userId) {
        socket.emit('privateMasssage', {
          to: chatWith,
          from: userId,
          msg: msg,
        });
      }
    }
    // console.log(msg);
    // console.log('From:' + userId);
    // console.log('chatwith' + chatWith);
  };

  const handleClick = (e) => {
    setSelected(e.target.id);
    const arr = data[e.target.id].members;
    const indexToRemove = arr.indexOf(userId);
    // console.log(indexToRemove);
    // console.log(arr[indexToRemove]);
    if (indexToRemove >= 0) {
      arr.splice(indexToRemove, 1);
    }
    setChatWith(arr[0]);
  };

  return (
    <div className="flex justify-start h-[100vh] w-[100vw]">
      <div className="w-[30%] h-[100vh] bg-slate-300">
        <div className="flex justify-between w-full">
          <FontAwesomeIcon
            icon={faUser}
            size="2xl"
            className=" text-gray-800 p-5"
          />
          <FontAwesomeIcon
            icon={faPlus}
            size="2xl"
            className=" text-gray-800 p-5"
          />
        </div>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <div id={index} key={index} onClick={handleClick}>
              <Names
                data={{
                  item,
                  index,
                  name: userId,
                  selected: selected,
                  chat: item.chats[Chats.length].msg,
                  chatWith: chatWith,
                }}
              />
            </div>
          ))
        ) : (
          <>no</>
        )}
      </div>
      {!selected ? (
        <>no element</>
      ) : (
        <div className="w-[70%] max-h-[100vh]">
          <div className="p-2 shadow-md rounded text-xl font-serif px-5">
            {chatWith}
          </div>
          <div className=" overflow-y-scroll max-h-[80vh]">
            {data[selected].chats.map((item, index) => (
              <div key={index}>
                <PriChat chats={{ item, name: userId, index }} />
              </div>
            ))}
          </div>
          <div className="h-fit w-[100%] flex justify-center items-center bg-none">
            <div className="flex justify-center items-center h-fit w-[60vw] rounded-xl border border-zinc-400">
              <textarea
                rows={1}
                className="p-2 m-1 w-[90%] focus:outline-none"
                type="text"
                name="msg"
                onChange={(e) => {
                  setMsg(e.target.value);
                }}
              />
              <button onClick={handleSubmit}>
                <FontAwesomeIcon icon={faBolt} size="2xl" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chats;
