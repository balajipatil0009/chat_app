import data from '../assets/data.json';
import PriChat from './PriChat';
import Names from './Names';

import React, { useEffect, useState } from 'react';

const Chats = () => {
  const [selected, setSelected] = useState(null);

  const handleClick = (e) => {
    setSelected(e.target.id);
  };

  return (
    <div className="flex justify-start border h-[100vh] w-[100vw]">
      <div>
        {data.map((item, index) => (
          <div
            id={index}
            key={index}
            onClick={handleClick}
            style={{ backgroundColor: 'red', border: '1px solid' }}
          >
            <Names name={{ item, index }} />
          </div>
        ))}
      </div>
      {!selected ? (
        <>no element</>
      ) : (
        <div>
          <div>{data[selected].members[0]}</div>
          {data[selected].chats.map((item) => (
            <PriChat chats={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Chats;
