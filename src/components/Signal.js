import React from "react";

function Signal({ show, color }) {
  return (
    <>
      {show ? (
        <>
          <span
            className={`animate-ping absolute inline-flex  rounded-full h-3 w-3 
            ${!color ? "bg-green-400" : color} `}
          ></span>
          <span
            className={`relative inline-flex rounded-full h-3 w-3 ${
              !color ? "bg-green-400" : color
            } `}
          ></span>
        </>
      ) : (
        <>
          <span
            className={`animate-ping absolute inline-flex  rounded-full h-3 w-3 
            ${!color ? "bg-red-400" : color} `}
          ></span>
          <span
            className={`relative inline-flex rounded-full h-3 w-3 ${
              !color ? "bg-red-400" : color
            } `}
          ></span>
        </>
      )}
    </>
  );
}

export default Signal;
