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
  const [bussiness, setBussiness] = useState("Employment");
  const dispatch = useDispatch();
  const entrepreneurCreate = useSelector((state) => state.entrepreneurCreate);
  const { loading, success, error } = entrepreneurCreate;
  const [cloudLoading, setCloudLoading] = useState(false);
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const [createdBy, setCreatedBy] = useState("");
  const [updatedBy, setUpdatedBy] = useState("");

  console.log(createdBy);

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
    } catch (error) {
      console.log(error);
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
      setYear("");
      setBio("");
      setBussiness("");
    }
  }, [error, success]);

  const createEntreprenuer = (e) => {
    e.preventDefault();
    if (!image) return;
    dispatch(
      EntrepreneurCreate(
        name,
        email,
        image,
        phone,
        year,
        bussiness,
        bio,
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
            Create New Entrepreneur
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
              <div className="input_div">
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
              </div>
              <div className="select_div">
                <label>Year</label>
                <input
                  disabled={loading}
                  required
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
                <label>Bio</label>
                <textarea
                  disabled={loading}
                  required
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <label>Bussiness Sector</label>
                <div className="overflow_man">
                  <select
                    onChange={(e) => setBussiness(e.target.value)}
                    disabled={loading}
                  >
                    <option value="Employment">Employment</option>
                    <option value="Entreprenuership">Entreprenuership</option>
                    <option value="Fin Tech">
                      Fin Tech (Financial Technology)
                    </option>
                    <option value="Med Tech">
                      Med Tech (Medical Technology)
                    </option>
                    <option value="Ed Tech">
                      Ed Tech (Educational Technology)
                    </option>
                    <option value="Legal Tech">
                      Legal Tech (Legal Technology)
                    </option>
                    <option value="Ad Tech">
                      Ad Tech (Advertising Technology)
                    </option>
                    <option value="Reg Tech">
                      Reg Tech (Regulatory Technology)
                    </option>
                    <option value="Clean Tech">
                      Clean Tech (Clean Technology)
                    </option>
                    <option value="Fem Tech">
                      Fem Tech (Femal Technology)
                    </option>
                    <option value="Health Tech">
                      Health Tech (Health Technology)
                    </option>
                    <option value="Yester Tech">
                      Yester Tech (Retro Technology)
                    </option>
                    <option value="Prop Tech">
                      Prop Tech (Property Technology)
                    </option>
                    <option value="Insure Tech">
                      Insure Tech (Insurance Technology)
                    </option>
                    <option value="Wealth Tech">
                      Wealth Tech (Wealth Technology)
                    </option>
                    <option value="Food Tech">
                      Food Tech (Food Technology)
                    </option>
                    <option value="Bio Tech">Bio Tech (Bio Technology)</option>
                    <option value="Art Tech">
                      Art Tech (Artistic Technology)
                    </option>
                    <option value="Mark Tech">
                      Mark Tech (Marketing Technology)
                    </option>
                  </select>
                </div>
              </div>
            </div>
            {!cloudLoading && (
              <button
                onClick={createEntreprenuer}
                className={`${loading && "animate-pulse font-semibold"}`}
              >{`${loading ? "Creating..." : "Create"}`}</button>
            )}
            {cloudLoading && (
              <button
                style={{"cursor":"not-allowed"}}
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
