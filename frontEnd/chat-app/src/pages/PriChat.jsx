import React, { useEffect } from 'react';

function PriChat(parms) {
  useEffect(() => {
    console.log(parms);
    console.log('balaji');
  }, []);
  return (
    <>
      <div>{parms.chats.msg}</div>
    </>
  );
}

export default PriChat;
