import signinIcon from "../../assets/signin.gif";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  console.log(data);
  return (
    <section>
      <div className="mx-auto container p-4">
        <div className="bg-white p-4 w-full max-w-md mx-auto rounded">
          <div className="w-20 h-20 mx-auto">
            <img src={signinIcon} alt="login icon" />
          </div>
          <form className="pt-6" onSubmit={handleSubmit}>
            <div>
              <label>Email :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  placeholder="enter email"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label>Password :</label>
              <div className="bg-slate-100 flex items-center p-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  placeholder="enter password"
                  className="w-full h-full outline-none  bg-transparent"
                />
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEye size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </button>
              </div>
              <Link
                to="/forgot-password"
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                Forgot password
              </Link>
            </div>
            <div className="w-full flex items-center">
              <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 mx-auto  max-w-[150px]  my-4 w-full rounded-full  hover:scale-110 transition-all ">
                Login
              </button>
            </div>
          </form>
          <p className="my-4">
            Don't have account ?{" "}
            <Link to="/signup" className="text-red-600 hover:text-red-700">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
