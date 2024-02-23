import React, { useEffect } from "react";

function PriChat(parms) {
  useEffect(() => {
    // console.log(parms);
  }, []);
  return (
    <div key={parms.name + parms.index}>
      {parms.chats.item.from == parms.chats.name ? (
        <div className="w-[100%] flex justify-end">
          <div className="  rounded max-w-[50%] h-fit break-words">
            <div className="w-fit bg-cyan-200 rounded-xl m-2 p-3">
              <div className="text-end">
                <p>{parms.chats.item.msg}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="  rounded max-w-[50%] h-fit break-words">
            <div className="w-fit bg-gray-200 rounded-xl m-2 p-3">
              <div className="text-end">
                <p>{parms.chats.item.msg}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PriChat;
