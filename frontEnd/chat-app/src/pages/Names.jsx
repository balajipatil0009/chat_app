import React, { useEffect } from 'react';

const Names = (parms) => {
  useEffect(() => {
    console.log(parms);
  }, []);
  return <div id={parms.name.index}>Names</div>;
};

export default Names;
