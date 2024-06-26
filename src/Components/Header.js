import React from "react";
import Logo from "../assets/techifyLogo.png";
import { FaSearch } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { profileState } from "../Redux/profileSlice";
import useNotification from "../Hooks/useNotification";
import { env } from "../utils/env";
import { logoutFn } from "../Redux/logoutSlice";

export default function Header() {
  const { profilePic, email } = useSelector(profileState);
  const { showMessage } = useNotification();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const response = await fetch(`${env.backendUrl}/api/signout`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    if (data.error) {
      showMessage({ type: "error", value: data.message });
      return;
    }
    showMessage({ type: "success", value: data.message });
    dispatch(logoutFn());
  };

  return (
    <header className="h-20 bg-white shadow-md">
      <div className="container h-full w-full max-w-screen-2xl flex items-center mx-auto px-4 justify-between">
        <Link to="/">
          <img
            src={Logo}
            alt="Logo"
            className="w-[6rem] h-[5rem] object-contain"
          />
        </Link>
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
        <div className="flex items-center  gap-7">
          {profilePic ? (
            <img
              src={profilePic}
              alt="profile"
              className="w-10 h-10 cursor-pointer rounded-full"
            />
          ) : (
            <div className="text-2xl cursor-pointer">
              <FaRegCircleUser />
            </div>
          )}
          <div className="text-2xl  relative cursor-pointer">
            <span>
              <FaShoppingCart />
            </span>
            <div className="bg-red-600 absolute -top-2 -right-2 text-white w-4 p-1 h-4 rounded-full flex items-center justify-center">
              <p className="text-xs">0</p>
            </div>
          </div>
          {email ? (
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-center text-white rounded-full bg-red-600 hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-3 py-1 text-center text-white rounded-full bg-red-600 hover:bg-red-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
