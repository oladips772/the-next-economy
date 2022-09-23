/** @format */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { AdminPasswordUpdate } from "../Redux/Actions/AdminAction";
import toast from "react-hot-toast";
import queryString from "query-string";
import axios from "axios";
import URL from "../url";

function PasswordUpdateScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [invalidUser, setInvalidUser] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(true);
  const { token, id } = queryString.parse(location.search);

  const dispatch = useDispatch();
  const adminUpdatePassword = useSelector((state) => state.adminUpdatePassword);
  const { loading, error, success } = adminUpdatePassword;

  const isVerifyToken = async () => {
    try {
      const { data } = await axios.post(
        `${URL}/api/admins/verify-token?token=${token}&id=${id}`
      );
      console.log(data);
      setVerifyLoading(false);
    } catch (err) {
      console.log(err);
      if (err?.response?.data) {
        const { data } = err?.response;
        console.log(data);
        if (!data.success) return setInvalidUser(true);
        return console.log(err.response.data);
      }
      console.log(err);
    }
  };

  useEffect(() => {
    isVerifyToken();
  }, []);

  useEffect(() => {
    if (success) {
      toast.success("password updated succesfully");
      navigate("/Login");
      window.location.reload();
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      window.location.reload();
    }
  }, [error]);

  const UPDATE = (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      toast.error("passwords do not match !");
    } else {
      dispatch(AdminPasswordUpdate(email, password));
    }
  };

  if (invalidUser) {
    return (
      <div className="h-[100vh] bg-black flex justify-center items-center">
        <div>
          <h1 className="text-white text-[600]">Invalid Token</h1>
        </div>
      </div>
    );
  }

  return (
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
          <input
            disabled={loading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="border-green-300 border-[1px] outline-none p-2 w-full my-2 rounded bg-transparent text-white bg-black"
          />
          <input
            disabled={loading}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
            className="border-green-300 border-[1px] outline-none p-2 w-full my-2 rounded bg-transparent text-white bg-black"
          />
          <button
            disabled={loading}
            className={`text-white ${
              loading
                ? "bg-green-800 text-[12px] animate-pulse"
                : "bg-green-600"
            } p-2 rounded text-sm font-bold mt-4 w-full`}
            onClick={UPDATE}
          >
            {`${loading ? "Updating..." : "Update"}`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PasswordUpdateScreen;
