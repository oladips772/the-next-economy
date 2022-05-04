/** @format */
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  AdminCreate,
  deleteAdmin,
  disableAdmin,
  enableAdmin,
  listAdmins,
} from "../Redux/Actions/AdminAction";
import toast from "react-hot-toast";

function CreateAdmin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const adminCreate = useSelector((state) => state.adminCreate);
  const { loading, error, success } = adminCreate;
  const adminsList = useSelector((state) => state.adminsList);
  const { loading: adminsLoading, admins } = adminsList;
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(AdminCreate(name, email, password));
  };

  const ENABLE = (id) => {
    dispatch(enableAdmin(id));
    toast.success("admin enabled successfully");
    window.location.reload();
  };

  const DISABLE = (id) => {
    dispatch(disableAdmin(id));
    toast.success("admin disabled successfully");
    window.location.reload();
  };

  const DELETE = (id) => {
    dispatch(deleteAdmin(id));
    toast.success("admin deleted successfully");
    window.location.reload();
  };

  useEffect(() => {
    dispatch(listAdmins());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      window.location.reload();
    } else if (success) {
      toast.success("admin created succesfully");
      setName("");
      setEmail("");
      setPassword("");
      window.location.reload();
    }
  }, [error, success]);

  return (
    <div className="flex justify-between">
      <Sidebar />
      <div className="flex justify-between ">
        <div className="ml-[250px] mt-4 mb-4">
          <h1 className="text-lg mb-6 font-semibold">NEW ADMIN</h1>
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
                className="h-[35px] w-[350px] border border-black outline-none p-2 rounded my-4"
              />
              <label className="-mb-4">Admin Email</label>
              <input
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="h-[35px] w-[350px] border border-black outline-none p-2 rounded my-4"
              />
              <label className="-mb-4">Admin Password</label>
              <input
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="h-[35px] w-[350px] border border-black outline-none p-2 rounded my-4"
              />
              <button
                disabled={loading}
                className={`w-[350px] ${
                  loading ? "bg-green-800 animate-pulse" : "bg-green-600"
                } text-white h-[35px] rounded mt-4 font-semibold text-[13px]`}
              >
                {`${loading ? "Creating..." : "Create"}`}
              </button>
            </form>
          </div>
          {/* admins div */}
        </div>
        {/* admins div */}
        <div className="mt-4 mb-4 ml-8 w-[600px]">
          <h1 className="mb-4 font-semibold">ADMIN ACCOUNTS</h1>
          <div className="flex items-center mx-6 justify-between border-b border-gray-400">
            <p className="font-bold">Name</p>
            <p className="font-bold">Email</p>
            <p className="font-bold">Actions</p>
          </div>
          {!adminsLoading && (
            <>
              {admins?.map((admin) => (
                <div className="flex items-center mx-6 justify-between mt-4 -mr-4 p-2 border-b border-gray-400">
                  <span className="font-semibold text-gray-900">
                    {admin?.name}
                  </span>
                  <span className="font-semibold text-gray-900">
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
            <img src="/images/loader2.png" className="ml-[250px]" />
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateAdmin;
