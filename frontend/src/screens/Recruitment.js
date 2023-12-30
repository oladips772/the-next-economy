/** @format */
import React, { useRef, useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { EntrepreneurCreate } from "../Redux/Actions/EntrepreneurAction";
import toast from "react-hot-toast";

function HomeScreen() {
  const filePicker = useRef(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [year, setYear] = useState(null);
  const [bio, setBio] = useState("");
  const [bussiness, setBussiness] = useState("Employability");
  const [linkedinId, setLinkedinId] = useState("");
  const [facebookId, setFacebookId] = useState("");
  const [status, setStatus] = useState("Still in business");
  const dispatch = useDispatch();
  const entrepreneurCreate = useSelector((state) => state.entrepreneurCreate);
  const { loading, success, error } = entrepreneurCreate;
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
      dispatch({ type: "ENTREPRENEUR_CREATE_RESET" });
    } else if (success) {
      toast.success("created succesfully");
      dispatch({ type: "ENTREPRENEUR_CREATE_RESET" });
      setSelectedImage("");
      setImage(null);
      setName("");
      setEmail("");
      setPhone("");
      setYear("");
      setBio("");
      setLinkedinId("");
      setFacebookId("");
      setBussiness("");
    }
  }, [error, success]);

  const createEntreprenuer = (e) => {
    e.preventDefault();
    if (!image) return toast.error("please select a profile photo");
    if (!name.trim()) return toast.error("Full name is required");
    if (!email.trim()) return toast.error("Email is required");
    if (!phone.trim()) return toast.error("phone number url is required");
    if (!linkedinId.trim()) return toast.error("linked in url is required");
    if (!facebookId.trim()) return toast.error("facebook url is required");
    if (!bussiness.trim()) return toast.error("Business is required");
    if (!year) return toast.error("year is required");
    if (!bio.trim()) return toast.error("Bio is required");
    if (
      name.trim() &&
      email.trim() &&
      image.trim() &&
      bussiness.trim() &&
      bio.trim() &&
      linkedinId.trim() &&
      facebookId.trim()
    ) {
      dispatch(
        EntrepreneurCreate(
          name,
          email,
          image,
          phone,
          year,
          bussiness,
          bio,
          linkedinId,
          facebookId,
          status,
          createdBy,
          updatedBy
        )
      );
    } else {
      toast.error("remove whitespace from each fields");
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex-1">
          <Sidebar />
        </div>
        <div className="flex-[4.5] mb-4">
          <div className="p-[16px] rounded-[6px] bg-[#182237] mr-4 mt-3 mb-4">
            <h1 className="text-[16px] font-[400] text-white">
              New Entrepreneur
            </h1>
          </div>

          {/*  */}
          <div className="form_container ">
            <div className="flex justify-around w-full">
              <div className="image_div mt-4">
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
                  placeholder="Name"
                  className="h-[43px] border-[1.8px] border-gray-200 w-[430px] outline-1 p-2 rounded my-2"
                  disabled={loading}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  placeholder="Email"
                  className="h-[43px] border-[1.8px] border-gray-200 w-[430px] outline-1 p-2 rounded my-2"
                  disabled={loading}
                  required
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  placeholder="Phone number"
                  className="h-[43px] border-[1.8px] border-gray-200 w-[430px] outline-1 p-2 rounded my-2"
                  disabled={loading}
                  required
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <input
                  placeholder="Linkedin"
                  className="h-[43px] border-[1.8px] border-gray-200 w-[430px] outline-1 p-2 rounded my-2"
                  disabled={loading}
                  required
                  type="text"
                  value={linkedinId}
                  onChange={(e) => setLinkedinId(e.target.value)}
                />
                {/* <label>Status</label> */}
                <select
                  className="h-[43px] border-[1.8px] border-gray-200 bg-[#182237] text-gray-200 w-[430px] outline-1 p-2 rounded my-2"
                  onChange={(e) => setStatus(e.target.value)}
                  value={status}
                  disabled={loading}
                >
                  <option value="Still in business">Still in business</option>
                  <option value="Not in business">Not in business</option>
                </select>
              </div>
              <div className="flex flex-col mt-4">
                <input
                  className="h-[43px] border-[1.8px] border-gray-200 w-[430px] outline-1 p-2 rounded my-2"
                  disabled={loading}
                  placeholder="Facebook "
                  type="text"
                  value={facebookId}
                  onChange={(e) => setFacebookId(e.target.value)}
                />
                <input
                  className="h-[43px] border-[1.8px] border-gray-200 w-[430px] outline-1 p-2 rounded my-2"
                  disabled={loading}
                  placeholder="Year"
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
                <textarea
                  className="h-[103px] resize-none border-[1.8px] bg-[#182237] text-gray-200 border-gray-200  w-[430px] outline-1 p-2 rounded my-2"
                  disabled={loading}
                  placeholder="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <div className="overflow_man">
                  <select
                    className="h-[43px] border-[1.8px] bg-[#182237] text-gray-200 border-gray-200 w-[430px] outline-1 p-2 rounded my-2"
                    value={bussiness}
                    onChange={(e) => setBussiness(e.target.value)}
                    disabled={loading}
                  >
                    <option value="Employability">Employability</option>
                    <option value="Entrepreneurship">Entrepreneurship</option>
                  </select>
                </div>
              </div>
            </div>
            {!cloudLoading && (
              <button
                disabled={loading}
                onClick={createEntreprenuer}
                className={`${
                  loading && "animate-pulse font-semibold"
                } h-[43px] mt-[60px] bg-green-600 w-[80%] rounded mb-6 ml-[17%] text-white text-[13px] uppercase font-[500]`}
              >{`${loading ? "Creating..." : "Create"}`}</button>
            )}
            {cloudLoading && (
              <button
                style={{ cursor: "not-allowed" }}
                className={`${
                  cloudLoading && "animate-pulse text-[12px] font-semibold"
                } h-[43px] mt-[60px] mb-6 bg-green-600 w-[80%] rounded ml-[17%] text-white text-[13px] uppercase font-[500]`}
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
