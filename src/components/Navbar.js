import React from "react";

function Navbar({ children }) {
  return (
    <>
      <div className=" w-full bg-slate-600  p-4 flex items-center justify-center">
        <div className="w-[1000px] flex items-center  justify-between">
          <div className="flex flex-col font-bold text-white  ">
            <span className="text-3xl">Analytics</span>
          </div>
          <>{children}</>
        </div>
      </div>
    </>
  );
}

export default Navbar;
