import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="border justify-center items-center  text-white h-24 bg-slate-800 flex flex-col  ">
      <Link className="font-sans self-start ml-6 text-4xl " to="/">
        <h1>NHL</h1>
      </Link>
      <div className=" cursor-pointer w-3/4 flex justify-around">
        <Link to="/games">Games</Link>
        <Link to="/standing">Standing</Link>
        <Link to="/live">Live</Link>
      </div>
    </div>
  );
}

export default Header;
