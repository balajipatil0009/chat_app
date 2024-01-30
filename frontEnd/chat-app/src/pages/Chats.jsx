import data from '../assets/data.json';
import PriChat from './PriChat';
import Names from './Names';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from '../modules/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';

const Chats = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  // useEffect(() => {
  //   axios.get('/auth').then((res) => {
  //     if (res.status != 200) {
  //       navigate('/login');
  //     }
  //   });
  // }, []);

  const handleClick = (e) => {
    setSelected(e.target.id);
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
        {data.map((item, index) => (
          <div id={index} key={index} onClick={handleClick}>
            <Names
              data={{
                item,
                index,
                name: 'rajesh',
                selected: selected,
                chat: item.chats[Chats.length].msg,
              }}
            />
          </div>
        ))}
      </div>
      {!selected ? (
        <>no element</>
      ) : (
        <div className="w-[70%] max-h-[100vh]">
          <div className="p-2 shadow-md rounded text-xl font-serif px-5">
            {data[selected].members[0]}
          </div>
          <div className=" overflow-y-scroll max-h-[80vh]">
            {data[selected].chats.map((item) => (
              <PriChat chats={{ item, name: 'rajesh' }} />
            ))}
          </div>
          <div className="h-fit w-[100%] flex justify-center items-center bg-none">
            <div className="flex justify-center items-center h-fit w-[60vw] rounded-xl border border-zinc-400">
              <textarea
                rows={1}
                className="p-2 m-1 w-[90%] focus:outline-none"
                type="text"
                name="msg"
              />
              <button>
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
