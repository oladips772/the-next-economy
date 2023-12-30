/** @format */
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import PrintIcon from "@mui/icons-material/Print";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEntrepreneur,
  listEntrepreneur,
  updateEntrepreneur,
} from "../Redux/Actions/EntrepreneurAction";
import toast from "react-hot-toast";
import axios from "axios";
import DeleteModal from "../components/DeleteModal";
import moment from "moment";
import PrintModal from "../components/PrintModal";
import loader from "../images/loader2.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

function Edit() {
  const navigate = useNavigate();
  const filePicker = useRef(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(null);
  const [year, setYear] = useState(null);
  const [bussiness, setBussiness] = useState("");
  const [bio, setBio] = useState("");
  const [linkedinId, setLinkedinId] = useState("");
  const [facebookId, setFacebookId] = useState("");
  const [image, setImage] = useState("");
  const [entrepreneurImage, setEntrepreneurImage] = useState("");
  const [status, setStatus] = useState("Still in business");

  const [cloudLoading, setCloudLoading] = useState(false);
  const [showModal, setModal] = useState(false);
  const [showPrint, setPrint] = useState(false);

  const dispatch = useDispatch();
  let params = useParams();
  const entrepreneurId = params.id;

  const entrepreneurDetails = useSelector((state) => state.entrepreneurDetails);
  const { loading, error, entrepreneur } = entrepreneurDetails;
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const updatedBy = adminInfo.name;

  const entrepreneurUpdate = useSelector((state) => state.entrepreneurUpdate);
  const {
    loading: updateLoading,
    error: errorUpdate,
    success,
  } = entrepreneurUpdate;

  const handleChange = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedImage(readerEvent.target.result);
    };
  };

  const DELETE = async (id) => {
    dispatch(deleteEntrepreneur(id)).then(() => {
      setModal(!showModal);
      toast.success("Entrepreneur Deleted");
      navigate("/Entrepreneurs");
    });
  };

  function close() {
    setModal(!showModal);
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateEntrepreneur(
        entrepreneurId,
        name,
        email,
        image ? image : entrepreneurImage,
        phone,
        year,
        bussiness,
        bio,
        linkedinId,
        facebookId,
        status,
        updatedBy
      )
    );
  };

  useEffect(() => {
    if (errorUpdate) {
      toast.error(errorUpdate);
      dispatch({ type: "ENTREPRENEUR_UPDATE_RESET" });
    }
    if (success) {
      toast.success("profile updated successfully");
      dispatch(listEntrepreneur(entrepreneurId));
      dispatch({ type: "ENTREPRENEUR_UPDATE_RESET" });
    }
  }, [errorUpdate, success,dispatch]);

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
    dispatch(listEntrepreneur(entrepreneurId));
  }, [dispatch, entrepreneurId]);

  const closePrint = () => {
    setPrint(!showPrint);
  };

  useEffect(() => {
    if (entrepreneur) {
      setName(entrepreneur.name);
      setEntrepreneurImage(entrepreneur.image);
      setEmail(entrepreneur.email);
      setPhone(entrepreneur.phone);
      setYear(entrepreneur.year);
      setBussiness(entrepreneur.bussiness);
      setBio(entrepreneur.bio);
      setLinkedinId(entrepreneur.linkedinId);
      setFacebookId(entrepreneur.facebookId);
      setStatus(entrepreneur.status);
    }
  }, [entrepreneur]);

  return (
    <div>
      {showPrint && (
        <PrintModal
          closePrint={closePrint}
          name={entrepreneur.name}
          image={entrepreneur.image}
          email={entrepreneur.email}
          phone={entrepreneur.phone}
          year={entrepreneur.year}
          bussiness={entrepreneur.bussiness}
          bio={entrepreneur.bio}
          linkedin={entrepreneur.linkedinId}
          facebook={entrepreneur.facebookId}
          status={entrepreneur.status}
        />
      )}
      {showModal && (
        <DeleteModal
          close={close}
          text="DELETE ENTREPRENEUR"
          image={entrepreneur.image}
          name={entrepreneur.name}
          onClick={() => DELETE(entrepreneurId)}
        />
      )}
      <div className="flex justify-between">
        <div className="flex-1">
          <Sidebar />
        </div>
        {error && toast.error(error)}
        {loading ? (
          <img src={loader} alt="" className="loading_image" />
        ) : (
          <div className="flex-[4.5] mt-4 mb-4 w-full">
            <div className="flex justify-between items-center bg-[#182237] rounded p-[16px] mr-6 mb-3">
              <h1 className="text-[16px]  font-[400] text-white flex items-center">
                Profile <MdKeyboardDoubleArrowRight /> {entrepreneur?.name}
              </h1>
              <PrintIcon
                className=" text-white h-12 w-12 mr-6 rounded-full cursor-pointer text-2xl"
                onClick={() => setPrint(!showPrint)}
              />
            </div>
            {/*  */}
            <div className="flex items-start pt-3 bg-[#182237]">
              {/* image div */}
              <div className="mx-4 flex flex-col items-center justify-center">
                <img
                  src={`${selectedImage ? selectedImage : entrepreneurImage}`}
                  alt=""
                  className="h-[130px] w-[150px] object-cover rounded"
                />
                <input
                  type="file"
                  ref={filePicker}
                  hidden
                  onChange={handleChange}
                />
                {!updateLoading && (
                  <CameraAltOutlinedIcon
                    className="text-green-600 cursor-pointer mt-2 text-lg"
                    onClick={() => filePicker.current.click()}
                  />
                )}
              </div>
              <div className="flex items-start w-full justify-around">
                <div className="flex flex-col">
                  <input
                    className="h-[43px] border-[1.8px] border-gray-200 text-gray-200 w-[430px] outline-1 p-2 rounded my-2"
                    disabled={updateLoading}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    className="h-[43px] border-[1.8px] border-gray-200 text-gray-200  w-[430px] outline-1 p-2 rounded my-2"
                    disabled={updateLoading}
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="h-[43px] border-[1.8px] border-gray-200 text-gray-200  w-[430px] outline-1 p-2 rounded my-2"
                    disabled={updateLoading}
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <input
                    className="h-[43px] border-[1.8px] border-gray-200 text-gray-200  w-[430px] outline-1 p-2 rounded my-2"
                    disabled={updateLoading}
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                  <input
                    className="h-[43px] border-[1.8px] border-gray-200 text-gray-200  w-[430px] outline-1 p-2 rounded my-2"
                    disabled={updateLoading}
                    type="text"
                    value={linkedinId}
                    onChange={(e) => setLinkedinId(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <input
                    className="h-[43px] border-[1.8px] border-gray-200 text-gray-200  w-[430px] outline-1 p-2 rounded my-2"
                    disabled={updateLoading}
                    type="text"
                    value={facebookId}
                    onChange={(e) => setFacebookId(e.target.value)}
                  />
                  <select
                    className="h-[43px] border-[1.8px] border-gray-200 bg-transparent text-gray-200  w-[430px] outline-1 p-2 rounded my-2"
                    onChange={(e) => setStatus(e.target.value)}
                    value={status}
                    disabled={updateLoading}
                  >
                    <option value="Still in business">Still in business</option>
                    <option value="Not in business">Not in business </option>
                  </select>
                  <textarea
                    className="h-[103px] resize-none border-[1.8px] bg-transparent border-gray-200 text-gray-200  w-[430px] outline-1 p-2 rounded my-2"
                    disabled={updateLoading}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                  <select
                    className="h-[43px] border-[1.8px] border-gray-200 bg-transparent text-gray-200  w-[430px] outline-1 p-2 rounded my-2"
                    // className="mb-[40px]"
                    onChange={(e) => setBussiness(e.target.value)}
                    disabled={updateLoading}
                  >
                    <option value={bussiness}>{bussiness}</option>
                    <option value="Employability">Employability</option>
                    <option value="Entrepreneurship">Entrepreneurship</option>
                  </select>
                </div>
              </div>
            </div>
            {/* buttons div */}
            <div className="flex flex-col pt-6 pb-6 bg-[#182237]">
              {cloudLoading && (
                <button
                  className={`${
                    cloudLoading && "animate-pulse text-sm mt-4"
                  } h-[43px] text-[13px] bg-green-600 text-white rounded uppercase font-[500] w-[81.5%] ml-[16.5%]`}
                >
                  {`${cloudLoading && "processing image please wait"}`}
                </button>
              )}
              {!cloudLoading && (
                <button
                  onClick={handleUpdate}
                  disabled={updateLoading}
                  className={`${
                    updateLoading ? "animate-pulse mt-4" : "text-sm mt-[20px]"
                  } h-[43px] text-[13px] bg-green-600 text-white rounded uppercase font-[500] w-[81.5%] ml-[16.5%]`}
                >
                  {`${updateLoading ? "Updating..." : "Update"}`}
                </button>
              )}
              {adminInfo?.masterAdmin && (
                <>
                  {!showModal && (
                    <button
                      disabled={updateLoading}
                      className="mt-4 delete-btn h-[43px] text-[13px] rounded bg-red-600 text-white font-[500] w-[81.5%] ml-[16.5%]"
                      onClick={() => setModal(!showModal)}
                    >
                      DELETE ENTREPRENEUR
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Edit;
