/** @format */
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  AdminCreate,
  AdminUpdate,
  deleteAdmin,
  disableAdmin,
  enableAdmin,
  getAdminDetails,
  listAdmins,
} from "../Redux/Actions/AdminAction";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import loader from "../images/loader2.png";

function CreateAdmin() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // ???????????
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // ????????
  const dispatch = useDispatch();
  const adminCreate = useSelector((state) => state.adminCreate);
  const { loading, error, success } = adminCreate;
  const adminsList = useSelector((state) => state.adminsList);
  const { loading: adminsLoading, admins } = adminsList;
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const adminDetails = useSelector((state) => state.adminDetails);
  const { admin } = adminDetails;
  const adminUpdate = useSelector((state) => state.adminUpdate);
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = adminUpdate;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      return toast.error("admin name is required");
    }
    if (!email.trim()) {
      return toast.error("admin email is required");
    }
    if (!password.trim()) {
      return toast.error("admin password is required");
    }
    if (name.trim() && email.trim() && password.trim()) {
      dispatch(AdminCreate(name, email, password));
    }
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
    }
  };

  const ENABLE = async (id) => {
    dispatch(enableAdmin(id)).then(() => {
      toast.success("admin enabled successfully");
      dispatch(listAdmins());
    });
  };

  const DISABLE = async (id) => {
    dispatch(disableAdmin(id)).then(() => {
      toast.success("admin disabled successfully");
      dispatch(listAdmins());
    });
  };

  const DELETE = async (id) => {
    if (window.confirm("are you sure you want to delete this admin?")) {
      dispatch(deleteAdmin(id)).then(() => {
        toast.success("admin deleted successfully");
        dispatch(listAdmins());
      });
    }
  };

  const UPDATE = () => {
    if (adminPassword !== confirmPassword) {
      toast.error("passwords do not match!");
    } else {
      if (confirmPassword.length < 6) {
        toast.error("Password should be atleast 6 characters");
      } else {
        dispatch(
          AdminUpdate({
            id: admin._id,
            adminName,
            adminEmail,
            adminPassword,
          })
        );
      }
    }
  };

  useEffect(() => {
    if (updateError) {
      toast.error(updateError);
      window.location.reload();
    } else if (updateSuccess) {
      toast.success("admin updated successfully");
      window.location.reload();
    }
  }, [updateError, updateSuccess]);

  useEffect(() => {
    dispatch(listAdmins());
    dispatch(getAdminDetails("profile"));
    if (!adminInfo.masterAdmin) {
      navigate("/");
    } else {
      setAdminName(adminInfo.name);
      setAdminEmail(adminInfo.email);
    }
  }, [dispatch, adminInfo, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "ADMIN_CREATE_RESET" });
    } else if (success) {
      toast.success("admin created succesfully");
      dispatch({ type: "ADMIN_CREATE_RESET" });
      setName("");
      setEmail("");
      setPassword("");
      dispatch(listAdmins());
    }
  }, [error, success]);

  return (
    <div className="flex justify-between">
      <Sidebar />
      <div className="flex justify-between mb-[480px]">
        <div className="ml-[250px] mt-4 mb-4 h-[100%] p-2">
          <h1 className="text-[20px] mb-6 font-[500] text-green-600">
            NEW ADMIN
          </h1>
          <div className="">
            <form className="flex flex-col mx-4" onSubmit={handleSubmit}>
              <label className="-mb-4" htmlFor="name">
                Admin Name
              </label>
              <input
                disabled={loading}
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="h-[35px] w-[380px] border border-black outline-none p-2 rounded my-4"
              />
              <label className="-mb-4">Admin Email</label>
              <input
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="h-[35px] w-[380px] border border-black outline-none p-2 rounded my-4"
              />
              <label className="-mb-4">Admin Password</label>
              <input
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="h-[35px] w-[380px] border border-black outline-none p-2 rounded my-4"
              />
              <button
                disabled={loading}
                className={`w-[380px] ${
                  loading ? "bg-green-800 animate-pulse" : "bg-green-600"
                } text-white h-[35px] rounded mt-4 font-semibold text-[13px]`}
              >
                {`${loading ? "CREATING..." : "CREATE"}`}
              </button>
            </form>
          </div>
          {/* admins div */}
        </div>
        {/* admins div */}
        <div className="mt-4 mb-4 ml-[70px] w-[500px]  rounded h-[100%]">
          <h1 className="mb-4 font-[500] text-green-600 p-4">ADMIN ACCOUNTS</h1>
          <div className="flex items-center mx-6 justify-between border-b border-gray-200">
            <p className="font-[500]">Name</p>
            <p className="font-[500]">Email</p>
            <p className="font-[500]">Actions</p>
          </div>
          {!adminsLoading && (
            <>
              {admins?.map((admin) => (
                <div className="flex items-center mx-6 justify-between mt-1  p-2 border-b border-gray-200">
                  <span className="font-[400] text-gray-900">
                    {admin?.name}
                  </span>
                  <span className="font-[400] text-gray-900">
                    {admin?.email}
                  </span>
                  <div className="flex items-center space-x-6">
                    <p
                      onClick={
                        admin?._id === adminInfo?._id
                          ? null
                          : admin?.isAdmin
                          ? () => DISABLE(admin?._id)
                          : () => ENABLE(admin?._id)
                      }
                      className={`${
                        admin?.isAdmin ? "bg-red-600" : "bg-green-600"
                      } text-white rounded p-[4px] font-semibold text-[13px] cursor-pointer`}
                    >
                      {`${
                        admin?._id === adminInfo?._id
                          ? "YOU"
                          : admin.isAdmin
                          ? "DISABLE"
                          : "ENABLE"
                      }`}
                    </p>
                    <p
                      className="bg-red-800 text-white rounded p-[4px] font-semibold text-[13px] cursor-pointer"
                      onClick={
                        admin?._id === adminInfo?._id
                          ? null
                          : () => DELETE(admin?._id)
                      }
                    >
                      {`${admin?._id === adminInfo?._id ? "YOU" : "DELETE"}`}
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
          {adminsLoading && (
            <img src={loader} className="ml-[250px]" alt="loader" />
          )}
        </div>
      </div>
      <div className="update_container shadow">
        <h2>(MASTER ADMIN) PROFILE UPDATE</h2>
        <input
          disabled={updateLoading}
          type="text"
          placeholder="Master Admin Name"
          value={adminName}
          onChange={(e) => setAdminName(e.target.value)}
        />
        <input
          disabled={updateLoading}
          type="text"
          placeholder="Master Admin Email"
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
        />
        <input
          type="password"
          disabled={updateLoading}
          placeholder="Master Admin Password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
        />
        <input
          disabled={updateLoading}
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          disabled={updateLoading}
          onClick={UPDATE}
          className={`${updateLoading && "animate-pulse"}`}
        >{`${updateLoading ? "UPDATING.." : "UPDATE"}`}</button>
      </div>
    </div>
  );
}

export default CreateAdmin;
