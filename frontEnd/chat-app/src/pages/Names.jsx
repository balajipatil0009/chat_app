import React, { useEffect, useState } from "react";

const Names = (parms) => {
  useEffect(() => {
    console.log(parms.data.name);
    chatsUser();
    if (parms.data.index == parms.data.selected) {
      setSelected1(true);
    }
    // console.log(parms.data.item.members);
  }, []);
  const chatsUser = () => {
    const indexToRemove = parms.data.item.members.indexOf(parms.data.name);
    // Remove the element if it's found
  };

  return (
    <>
      {parms.data.index == parms.data.selected ? (
        <div
          className="bg-gray-100 border mx-2 my-1 p-2 rounded"
          id={parms.data.index}
        >
          <p className="text-lg" id={parms.data.index}>
            {parms.data.item.members[0]}
          </p>
          <p className="text-sm text-gray-500" id={parms.data.index}>
            {parms.data.chat}
          </p>
        </div>
      ) : (
        <div id={parms.data.index} className="border mx-2 my-1 p-2 rounded">
          <p id={parms.data.index} className="text-xl">
            {parms.data.item.members[0]}
          </p>
          <p className="text-sm text-gray-500" id={parms.data.index}>
            {parms.data.chat}
          </p>
        </div>
      )}
    </>
  );
};

export default Names;
