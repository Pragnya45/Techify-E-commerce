import App from "./App";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/auth/Login";
import ForgotPassowrd from "./Pages/auth/ForgotPassowrd";
import Signup from "./Pages/auth/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassowrd />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);
export default router;
