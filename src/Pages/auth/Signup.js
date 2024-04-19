import signinIcon from "../../assets/signin.gif";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import useApi from "../../Hooks/useApi";
import { Link, useNavigate } from "react-router-dom";
import { imageToBase64 } from "../../helpers/imageTobase64";
import { env } from "../../utils/env";
import useNotification from "../../Hooks/useNotification";
export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });
  const { showMessage } = useNotification();
  const navigate = useNavigate();
  const [apiFn, loading] = useApi();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      console.log("PASSOWRD MISMATCH");
      return;
    }
    const response = await fetch(`${env.backendUrl}/api/signup`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const userdata = await response.json();

    console.log("data", userdata);
    if (userdata.error) {
      showMessage({ type: "error", value: userdata.message });
      return;
    }
    showMessage({ type: "success", value: userdata.message });
    navigate("/login");
  };
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      console.error("No file selected.");
      return;
    }

    try {
      const image = await imageToBase64(file);
      setData((data) => ({
        ...data,
        profilePic: image,
      }));
    } catch (error) {
      console.error("Error converting image to base64:", error);
    }
  };
  return (
    <section className="w-full h-[100vh] flex items-center justify-center">
      <div className="mx-auto container p-4">
        <div className="bg-white p-4 w-full max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto relative rounded-full overflow-hidden">
            <img
              src={data?.profilePic ? data?.profilePic : signinIcon}
              alt="login icon"
              className="w-full h-full object-cover"
            />
            <form>
              <label>
                <div className="text-[12px] bg-opacity-80 cursor-pointer pb-4 absolute bottom-0 w-full bg-slate-200 py-3 text-center">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div>
              <label>Name :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  placeholder="enter your name"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label>Email :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
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
                  required
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
            </div>
            <div>
              <label>Confirm Password :</label>
              <div className="bg-slate-100 flex items-center p-2">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={data.confirmPassword}
                  required
                  onChange={handleOnChange}
                  placeholder="enter password"
                  className="w-full h-full outline-none  bg-transparent"
                />
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaEye size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </button>
              </div>
            </div>
            <div className="w-full flex items-center">
              <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 mx-auto  max-w-[150px]  my-4 w-full rounded-full  hover:scale-110 transition-all ">
                Sign up
              </button>
            </div>
          </form>
          <p className="my-4">
            Already have account ?{" "}
            <Link to="/login" className="text-red-600 hover:text-red-700">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
