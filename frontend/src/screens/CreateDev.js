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
    } else if (success) {
      window.location.reload();
      toast.success("created succesfully");
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
    if (!image) return;
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
        <div className="ml-[250px] mt-4 mb-4 w-full">
          <h1 className="text-[24px] mb-6 font-semibold text-green-600">
            Create New Developers
          </h1>
          {/*  */}
          <div className="form_container shadow -mt-[100px]">
            <div className="flex_div">
              <div className="image_div">
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
              <div className="input_div mt-[110px]">
                <label>Full Name</label>
                <input
                  disabled={loading}
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Email</label>
                <input
                  disabled={loading}
                  required
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Phone</label>
                <input
                  disabled={loading}
                  required
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <label>Cohort</label>
                <input
                  disabled={loading}
                  required
                  type="text"
                  value={cohort}
                  onChange={(e) => setCohort(e.target.value)}
                />
                <label>Facebook ID</label>
                <input
                  disabled={loading}
                  required
                  type="text"
                  value={facebookId}
                  onChange={(e) => setFacebookId(e.target.value)}
                />
              </div>
              <div className="select_div">
                <label>Linkedin ID</label>
                <input
                  disabled={loading}
                  required
                  type="text"
                  value={linkedinId}
                  onChange={(e) => setLinkedinId(e.target.value)}
                />
                <label>Remarks</label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                ></textarea>
                <label>Payment Status</label>
                <select
                  className="mb-2"
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
                      disabled={loading}
                      required
                      type="number"
                      max={2}
                      value={paymentBalance}
                      onChange={(e) => setPaymentBalance(e.target.value)}
                    />
                  </>
                )}
                <label>Gender</label>
                <div className="overflow_man">
                  <select
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
                className={`${loading && "animate-pulse font-semibold"}`}
              >{`${loading ? "Creating..." : "Create"}`}</button>
            )}
            {cloudLoading && (
              <button
                style={{ cursor: "not-allowed" }}
                className={`${
                  cloudLoading && "animate-pulse text-[12px] font-semibold"
                }`}
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
