import React from "react";
import Logo from "../assets/techifyLogo.png";
import { FaSearch } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
export default function Header() {
  return (
    <header className="h-20 shadow-md">
      <div className="container h-full w-full max-w-screen-2xl flex items-center mx-auto px-4 justify-between">
        <div>
          <img
            src={Logo}
            alt="Logo"
            className="w-[6rem] h-[5rem] object-contain"
          />
        </div>
        <div className="lg:flex hidden items-center border rounded-full pl-2 w-full justify-between max-w-sm focus-within:shadow-md">
          <input
            type="text"
            placeholder="Search Products here..."
            className="outline-none  w-full"
          />
          <div className="text-lg min-w-[50px] h-8 cursor-pointer bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <FaSearch />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-2xl cursor-pointer">
            <FaRegCircleUser />
          </div>
          <div className="text-2xl relative cursor-pointer">
            <span>
              <FaShoppingCart />
            </span>
            <div className="bg-red-600 absolute -top-2 -right-2 text-white w-4 p-1 h-4 rounded-full flex items-center justify-center">
              <p className="text-xs">0</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
