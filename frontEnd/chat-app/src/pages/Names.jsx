import React, { useEffect, useState } from 'react';

const Names = (parm) => {
  const [members, setMembers] = useState(null);
  const [selected1, setSelected1] = useState(false);
  useEffect(() => {
    chatsUser();
    if (parm.data.index == parm.data.selected) {
      // console.log('balaji ahe re');
      setSelected1(true);
    }
    // if (parms) {
    //   if (parms.data.index == parms.data.selected) {
    //     // console.log('balaji ahe re');
    //     setSelected1(true);
    //   }
    // }
    // // console.log(parms.data.item.members);
  }, []);
  const chatsUser = () => {
    const indexToRemove = parm.data.item.members.indexOf(parm.data.name);
    // console.log(indexToRemove);
    // console.log(parm.data.item.members[indexToRemove]);
    if (indexToRemove >= 0) {
      parm.data.item.members.splice(indexToRemove, 1);
    }
    setMembers(parm.data.item.members);
    // console.log(parm.data.item.members);
  };

  return (
    <>
      {!parm ? (
        <></>
      ) : (
        <>
          {selected1 ? (
            <div
              className="bg-gray-100 border mx-2 my-1 p-2 rounded"
              id={parm.data.index}
            >
              <p className="text-lg" id={parm.data.index}>
                {parm.data.item.members[0]}
              </p>
              <p className="text-sm text-gray-500" id={parm.data.index}>
                {parm.data.chat}
              </p>
            </div>
          ) : (
            <div id={parm.data.index} className="border mx-2 my-1 p-2 rounded">
              <p id={parm.data.index} className="text-xl">
                {parm.data.item.members[0]}
              </p>
              <p className="text-sm text-gray-500" id={parm.data.index}>
                {parm.data.chat}
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Names;
