/** @format */
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AdminLogin } from "../Redux/Actions/AdminAction";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const adminLogin = useSelector((state) => state.adminLogin);
  const { loading, error, adminInfo } = adminLogin;

  useEffect(() => {
    if (adminInfo) {
      navigate("/");
    }
  }, [adminInfo,navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const LOGIN = (e) => {
    e.preventDefault();
    dispatch(AdminLogin(email, password));
  };

  return (
    <div className="bg-[#182237] h-[100vh] flex justify-center items-center">
      <div className="">
        <div className="flex flex-col">
          <img
            src="http://blackinnovationsafrica.com/wp-content/uploads/2020/02/logo.png"
            className="object-contain -mt-[200px] h-[55px] mb-4"
            alt=""
          />
          <input
            disabled={loading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            className="border-green-300 border-[1px] outline-none p-2 w-[400px] my-2 rounded text-white bg-black"
          />
          <input
            disabled={loading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="border-green-300 border-[1px] outline-none p-2 w-full my-2 rounded bg-transparent text-white "
          />
          <button
            disabled={loading}
            className={`text-white ${
              loading
                ? "bg-green-800 text-[12px] animate-pulse"
                : "bg-green-600"
            } p-2 rounded text-sm font-bold mt-4 w-full`}
            onClick={LOGIN}
          >
            {`${loading ? "Login you in..." : "Login"}`}
          </button>
          <NavLink
            to="/Forgot_Password"
            className="text-center text-green-400 mt-2"
          >
            forgot password ?{" "}
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Login;
