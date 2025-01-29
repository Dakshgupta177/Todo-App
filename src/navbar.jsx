import React from "react";

const Navbar = () => {
  return (
    <div className="bg-sky-600 text-white flex justify-between items-center h-10 p-8">
      <h1 className="text-xl font-bold ">My Todo</h1>
      <ul className="flex gap-4 ">
        <li className="hover:font-bold transition-all">Home</li>
        <li className="hover:font-bold transition-all">About</li>
      </ul>
    </div>
  );
};

export default Navbar;
