/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminUpdate } from "../Redux/Actions/AdminAction";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";

function MyProfile() {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const [adminName, setAdminName] = useState(adminInfo?.name);
  const [adminEmail, setAdminEmail] = useState(adminInfo?.email);
  const [adminPassword, setAdminPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const adminUpdate = useSelector((state) => state.adminUpdate);

  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = adminUpdate;

  useEffect(() => {
    if (updateError) {
      toast.error(updateError);
      dispatch({ type: "ADMIN_UPDATE_RESET" });
    } else if (updateSuccess) {
      toast.success("Profile updated successfully");
      dispatch({ type: "ADMIN_UPDATE_RESET" });
    }
  }, [updateError, updateSuccess, dispatch]);

  const UPDATE = () => {
    if (adminPassword !== confirmPassword) {
      toast.error("passwords do not match!");
    } else {
      if (adminPassword && adminPassword.length < 6) {
        toast.error("Password should be at least 6 characters");
      } else {
        dispatch(
          AdminUpdate({
            id: adminInfo._id,
            adminName,
            adminEmail,
            adminPassword,
          })
        );
      }
    }
  };

  return (
    <div className="flex">
      <div className="flex-1">
        <Sidebar />
      </div>
      <div className="flex-[4.5] mr-8 flex flex-col shadow bg-[#182237] rounded p-4">
        <h2 className="text-gray-200">PROFILE UPDATE</h2>
        <input
          className="border border-gray-200 text-gray-200 placeholder:text-gray-400 h-[43px] my-3 w-[500px] rounded p-3"
          disabled={updateLoading}
          type="text"
          placeholder="Admin Name"
          value={adminName}
          onChange={(e) => setAdminName(e.target.value)}
        />
        <input
          className="border border-gray-200 text-gray-200 placeholder:text-gray-400 h-[43px] my-3 w-[500px] rounded p-3"
          disabled={updateLoading}
          type="text"
          placeholder="Admin Email"
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
        />
        <input
          className="border border-gray-200 text-gray-200 placeholder:text-gray-400 h-[43px] my-3 w-[500px] rounded p-3"
          type="password"
          disabled={updateLoading}
          placeholder="Password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
        />
        <input
          className="border border-gray-200 text-gray-200 placeholder:text-gray-400 h-[43px] my-3 w-[500px] rounded p-3"
          disabled={updateLoading}
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          disabled={updateLoading}
          onClick={UPDATE}
          className={`${
            updateLoading && "animate-pulse"
          } h-[43px] bg-green-600 w-[500px] text-white rounded text-[13px]`}
        >{`${updateLoading ? "UPDATING.." : "UPDATE"}`}</button>
      </div>
    </div>
  );
}

export default MyProfile;
