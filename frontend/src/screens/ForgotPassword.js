/** @format */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import URL from "../url";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const SendLink = async () => {
    setLoading(true)
    try {
      const { data } = await axios.post(`${URL}/api/admins/forgot-password`, {
        email,
      });
      setEmail("")
      console.log(data);
      toast.success("reset link sent successfully");
    } catch (err) {
      toast.error(err.response.data.error);
    }
    setLoading(false)

  };

  return (
    <div>
      <div className="bg-black h-[100vh] flex justify-center items-center">
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

            <button
              disabled={loading}
              className={`text-white ${
                loading
                  ? "bg-green-800 text-[12px] animate-pulse"
                  : "bg-green-600"
              } p-2 rounded text-sm font-[600] mt-4 w-full`}
              onClick={SendLink}
            >
              {`${loading ? "Sending.." : "Send Reset Link"}`}
            </button>
            <NavLink to="/Login" className="text-center text-green-400 mt-2">
              back to login{" "}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
