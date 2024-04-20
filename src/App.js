import logo from "./logo.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useEffect } from "react";
import { env } from "./utils/env";
import Context from "./Context";
import { useDispatch } from "react-redux";
import { profileFn } from "./Redux/profileSlice";

function App() {
  const dispatch = useDispatch();

  const fetchUserdetails = async () => {
    const response = await fetch(`${env.backendUrl}/api/user`, {
      method: "GET",
      credentials: "include",
    });
    const dataApi = await response.json();
    const { name, email, profilePic } = dataApi.data;
    dispatch(profileFn({ name, email, profilePic }));
  };

  useEffect(() => {
    fetchUserdetails();
  }, []);
  return (
    <>
      <Context.Provider value={{ fetchUserdetails }}>
        <Header />
        <main className="min-h-screen">
          <Outlet />{" "}
        </main>{" "}
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
