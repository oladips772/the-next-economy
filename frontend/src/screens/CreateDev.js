/** @format */
import React, { useRef, useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { DeveloperCreate } from "../Redux/Actions/DeveloperAction";

function HomeScreen() {
  const filePicker = useRef(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cohort, setCohort] = useState("");
  const [gender, setGender] = useState("Male");
  const [linkedinId, setLinkedinId] = useState("");
  const [facebookId, setFacebookId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Fully Paid");
  const [paymentBalance, setPaymentBalance] = useState("");
  const [remarks, setRemarks] = useState("");
  const dispatch = useDispatch();
  const developerCreate = useSelector((state) => state.developerCreate);
  const { loading, success, error } = developerCreate;
  const [cloudLoading, setCloudLoading] = useState(false);
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const [createdBy, setCreatedBy] = useState("");
  const [updatedBy, setUpdatedBy] = useState("");

  const handleChange = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedImage(readerEvent.target.result);
    };
  };

  useEffect(() => {
    if (adminInfo) {
      setCreatedBy(adminInfo?.name);
      setUpdatedBy(adminInfo?.name);
    }
  }, [adminInfo]);

  const handleCreate = async () => {
    if (!selectedImage) return;
    setCloudLoading(true);
    const data = new FormData();
    data.append("file", selectedImage);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dsbhrtd0o/image/upload",
        data
      );
      const { url } = uploadRes.data;
      setImage(url);
      console.log(uploadRes.data);
    } catch (err) {
      console.log(err);
      err && toast.error(`${err.message}, reselect the image please`);
    }
    setCloudLoading(false);
  };

  useEffect(() => {
    if (selectedImage) {
      handleCreate();
    }
  }, [selectedImage]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "DEVELOPER_CREATE_RESET" });
    } else if (success) {
      dispatch({ type: "DEVELOPER_CREATE_RESET" });
      toast.success("created successfully");
      setSelectedImage("");
      setImage(null);
      setName("");
      setEmail("");
      setPhone("");
      setCohort("");
      setLinkedinId("");
      setFacebookId("");
      setRemarks("");
    }
  }, [error, success]);

  const createDeveloper = (e) => {
    e.preventDefault();
    if (!image) return toast.error("please select a profile photo");
    if (!name.trim()) return toast.error("Full name is required");
    if (!email.trim()) return toast.error("Email is required");
    if (!phone) return toast.error("Phone is required");
    if (!cohort.trim()) return toast.error("Cohort is required");
    if (!facebookId.trim()) return toast.error("facebook url is required");
    if (!linkedinId.trim()) return toast.error("linked in url is required");

    dispatch(
      DeveloperCreate(
        name,
        email,
        image,
        phone,
        gender,
        cohort,
        linkedinId,
        facebookId,
        remarks,
        paymentStatus,
        paymentBalance,
        createdBy,
        updatedBy
      )
    );
  };

  return (
    <div>
      <div className="flex justify-between">
        <Sidebar />
        <div className="ml-[220px] mt-4 mb-4 w-full">
          <h1 className="text-[17px] ml-6 font-[500] text-white p-3 rounded bg-green-600 mr-6">
            New Developer
          </h1>
          {/*  */}
          <div className="w-full flex flex-col">
            <div className="flex justify-around w-full">
              <div className="image_div mt-4 ">
                <img
                  src={`${
                    selectedImage
                      ? selectedImage
                      : "https://images.vexels.com/media/users/3/129733/isolated/preview/a558682b158debb6d6f49d07d854f99f-casual-male-avatar-silhouette.png"
                  }`}
                  alt=""
                  className=""
                />
                <input
                  type="file"
                  hidden
                  ref={filePicker}
                  onChange={handleChange}
                />
                {!loading && (
                  <CameraAltOutlinedIcon
                    className="camera"
                    onClick={() => filePicker.current.click()}
                  />
                )}
              </div>
              <div className="flex flex-col mt-4">
                <input
                  className="h-[43px] border-[1.8px] border-gray-600 w-[430px] outline-1 p-2 rounded my-2"
                  disabled={loading}
                  required
                  placeholder="Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="h-[43px] border-[1.8px] border-gray-600 w-[430px] outline-1 p-2 rounded my-2"
                  disabled={loading}
                  placeholder="Email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="h-[43px] border-[1.8px] border-gray-600 w-[430px] outline-1 p-2 rounded my-2"
                  disabled={loading}
                  required
                  placeholder="Phone number"
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  className="h-[43px] border-[1.8px] border-gray-600 w-[430px] outline-1 p-2 rounded my-2"
                  disabled={loading}
                  required
                  placeholder="Cohort"
                  type="text"
                  value={cohort}
                  onChange={(e) => setCohort(e.target.value)}
                />
                <input
                  className="h-[43px] border-[1.8px] border-gray-600 w-[430px] outline-1 p-2 rounded my-2"
                  disabled={loading}
                  required
                  type="text"
                  placeholder="Facebook url"
                  value={facebookId}
                  onChange={(e) => setFacebookId(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-4">
                <input
                  className="h-[43px] border-[1.8px] border-gray-600 w-[430px] outline-1 p-2 rounded my-2"
                  disabled={loading}
                  placeholder="Linkedin url"
                  type="text"
                  value={linkedinId}
                  onChange={(e) => setLinkedinId(e.target.value)}
                />
                <textarea
                  placeholder="Remarks"
                  className="h-[103px] resize-none border-[1.8px] border-gray-600 w-[430px] outline-1 p-2 rounded my-2"
                  disabled={loading}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                ></textarea>
                <select
                  className="h-[43px] border-[1.8px] border-gray-600 w-[430px] outline-1 p-2 rounded my-2"
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  disabled={loading}
                >
                  <option value="Fully Paid">Fully Paid</option>
                  <option value="Partly Paid">Partly Paid</option>
                  <option value="Not Paid">Not Paid</option>
                </select>
                {paymentStatus === "Partly Paid" && (
                  <>
                    <label className="">Payment Balance</label>
                    <input
                      className="h-[43px] border-[1.8px] border-gray-600 w-[430px] outline-1 p-2 rounded my-2"
                      disabled={loading}
                      required
                      type="number"
                      max={2}
                      value={paymentBalance}
                      onChange={(e) => setPaymentBalance(e.target.value)}
                    />
                  </>
                )}
                <div>
                  <select
                    className="h-[43px] border-[1.8px] border-gray-600 w-[430px] outline-1 p-2 rounded my-2"
                    onChange={(e) => setGender(e.target.value)}
                    disabled={loading}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            </div>
            {!cloudLoading && (
              <button
                disabled={loading}
                onClick={createDeveloper}
                className={`${
                  loading && "animate-pulse font-semibold"
                }  bg-green-600 h-[46px] w-[79%] ml-[19%] mt-8 text-white font-[500] uppercase rounded`}
              >{`${loading ? "Creating..." : "Create"} `}</button>
            )}
            {cloudLoading && (
              <button
                style={{ cursor: "not-allowed" }}
                className={`${
                  cloudLoading && "animate-pulse text-[12px] font-semibold"
                } bg-green-600 h-[46px] w-[79%] ml-[19%] mt-8 text-white font-[500] uppercase rounded`}
              >
                {`${cloudLoading && "processing image please wait"}`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
