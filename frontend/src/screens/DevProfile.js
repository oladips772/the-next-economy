/** @format */
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import PrintIcon from "@mui/icons-material/Print";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDeveloper,
  listDeveloper,
  updateDeveloper,
} from "../Redux/Actions/DeveloperAction";
import toast from "react-hot-toast";
import axios from "axios";
import DeleteModal from "../components/DeleteModal";
import PrintModal2 from "../components/PrintModal2";
import loader from "../images/loader2.png";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

function Edit() {
  let params = useParams();
  const developerId = params.id;
  const navigate = useNavigate();
  const filePicker = useRef(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cohort, setCohort] = useState("");
  const [gender, setGender] = useState("");
  const [linkedinId, setLinkedinId] = useState("");
  const [facebookId, setFacebookId] = useState("");
  const [image, setImage] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Fully Paid");
  const [paymentBalance, setPaymentBalance] = useState("");
  const [remarks, setRemarks] = useState("");
  const [showPrint, setPrint] = useState(false);

  const [developerImage, setDeveloperImage] = useState("");
  const [cloudLoading, setCloudLoading] = useState(false);
  const [showModal, setModal] = useState(false);
  const dispatch = useDispatch();

  const developerDetails = useSelector((state) => state.developerDetails);
  const { loading, error, developer } = developerDetails;
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const updatedBy = adminInfo.name;

  const developerUpdate = useSelector((state) => state.developerUpdate);
  const {
    loading: updateLoading,
    error: errorUpdate,
    success,
  } = developerUpdate;

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
    dispatch(deleteDeveloper(id)).then(() => {
      setModal(!showModal);
      toast.success("Developer Deleted");
      navigate("/Developers");
    });
  };

  function close() {
    setModal(!showModal);
  }

  useEffect(() => {
    if (paymentStatus === "Fully Paid" || paymentStatus === "Not Paid") {
      setPaymentBalance("");
    }
  }, [paymentStatus]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateDeveloper(
        developerId,
        name,
        email,
        image ? image : developerImage,
        phone,
        gender,
        cohort,
        linkedinId,
        facebookId,
        remarks,
        paymentStatus,
        paymentBalance,
        updatedBy
      )
    );
  };

  useEffect(() => {
    if (errorUpdate) {
      toast.error(errorUpdate);
      dispatch({ type: "DEVELOPER_UPDATE_RESET" });
    }
    if (success) {
      toast.success("profile updated successfully");
      dispatch(listDeveloper(developerId));
      dispatch({ type: "DEVELOPER_UPDATE_RESET" });
      dispatch(listDeveloper(developerId));
    }
  }, [errorUpdate, success]);

  // ? create image url with cloudinary
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
    dispatch(listDeveloper(developerId));
  }, [dispatch, developerId]);

  useEffect(() => {
    if (developer) {
      setName(developer.name);
      setDeveloperImage(developer.image);
      setEmail(developer.email);
      setPhone(developer.phone);
      setCohort(developer.cohort);
      setGender(developer.gender);
      setLinkedinId(developer.linkedinId);
      setFacebookId(developer.facebookId);
      setRemarks(developer.remarks);
      setPaymentStatus(developer.paymentStatus);
      setPaymentBalance(developer.paymentBalance);
    }
  }, [developer]);

  const closePrint = () => {
    setPrint(!showPrint);
  };

  return (
    <div>
      {showPrint && (
        <PrintModal2
          closePrint={closePrint}
          name={developer.name}
          image={developer.image}
          email={developer.email}
          phone={developer.phone}
          cohort={developer.cohort}
          remarks={developer.remarks}
          linkedin={developer.linkedinId}
          facebook={developer.facebookId}
          status={developer.paymentStatus}
          balance={developer.paymentBalance}
        />
      )}
      {showModal && (
        <DeleteModal
          close={close}
          text="DELETE DEVELOPER"
          image={developer.image}
          name={developer.name}
          onClick={() => DELETE(developerId)}
        />
      )}
      <div className="flex justify-between">
        <Sidebar />
        {error && toast.error(error)}
        {loading ? (
          <img src={loader} alt="" className="loading_image" />
        ) : (
          <div className="ml-[250px] mt-4 mb-4 w-full">
            <div className="flex justify-between items-center bg-[#182237] rounded p-[16px] mr-6 mb-3">
              <h1 className="text-[16px]  font-[400] text-white flex items-center">
                Profile <MdKeyboardDoubleArrowRight /> {developer?.name}
              </h1>
              <PrintIcon
                className=" text-white h-12 w-12 mr-6 rounded-full cursor-pointer text-2xl"
                onClick={() => setPrint(!showPrint)}
              />
            </div>
            {/*  */}
            <div className="flex flex-col">
              <div className="flex items-start justify-around w-full">
                <div className="edit_image_div mt-2">
                  <img
                    src={`${selectedImage ? selectedImage : developerImage}`}
                    alt=""
                    className="h-[120px] w-[120px] object-cover rounded"
                  />
                  <input
                    type="file"
                    ref={filePicker}
                    hidden
                    onChange={handleChange}
                  />
                  {!updateLoading && (
                    <CameraAltOutlinedIcon
                      className="camera mt-2 text-green-600"
                      onClick={() => filePicker.current.click()}
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <input
                    className="h-[43px] border-[1.8px] border-gray-200 text-gray-200 w-[430px] outline-1 p-2 rounded my-2"
                    disabled={updateLoading}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    className="h-[43px] border-[1.8px] border-gray-200 text-gray-200 w-[430px] outline-1 p-2 rounded my-2"
                    disabled={updateLoading}
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="h-[43px] border-[1.8px] border-gray-200 text-gray-200 w-[430px] outline-1 p-2 rounded my-2"
                    disabled={updateLoading}
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <input
                    className="h-[43px] border-[1.8px] border-gray-200 text-gray-200 w-[430px] outline-1 p-2 rounded my-2"
                    disabled={updateLoading}
                    type="text"
                    value={cohort}
                    onChange={(e) => setCohort(e.target.value)}
                  />
                  <input
                    className="h-[43px] border-[1.8px] border-gray-200 text-gray-200 w-[430px] outline-1 p-2 rounded my-2"
                    disabled={updateLoading}
                    type="text"
                    value={linkedinId}
                    onChange={(e) => setLinkedinId(e.target.value)}
                  />
                  <input
                    className="h-[43px] border-[1.8px] border-gray-200 text-gray-200 w-[430px] outline-1 p-2 rounded my-2"
                    disabled={updateLoading}
                    type="text"
                    value={facebookId}
                    onChange={(e) => setFacebookId(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <select
                    className="h-[43px] border-[1.8px] bg-transparent border-gray-200 text-gray-200 w-[430px] outline-1 p-2 rounded my-2"
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    disabled={loading}
                  >
                    <option value="Fully Paid">Fully Paid</option>
                    <option value="Partly Paid">Partly Paid</option>
                    <option value="Not Paid">Not Paid</option>
                  </select>
                  {paymentStatus === "Partly Paid" && (
                    <>
                      <label className="mt-2 text-[12px] text-gray-200">
                        Payment Balance
                      </label>
                      <input
                        className="h-[43px] border-[1.8px] border-gray-200 text-gray-200 w-[430px] outline-1 p-2 rounded my-2"
                        disabled={loading}
                        required
                        type="number"
                        value={paymentBalance}
                        onChange={(e) => setPaymentBalance(e.target.value)}
                      />
                    </>
                  )}
                  <textarea
                    placeholder="Remarks"
                    className="h-[133px] resize-none border-[1.8px] bg-transparent border-gray-200 text-gray-200 w-[430px] outline-1 p-2 rounded my-2"
                    disabled={updateLoading}
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  ></textarea>
                  <select
                    value={gender}
                    className="h-[43px] border-[1.8px] bg-transparent border-gray-200 text-gray-200 w-[430px] outline-1 p-2 rounded my-2"
                    onChange={(e) => setGender(e.target.value)}
                    disabled={updateLoading}
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>
              </div>
              {cloudLoading && (
                <button
                  className={`${
                    cloudLoading && "animate-pulse text-sm mt-[40px]"
                  } bg-green-600 h-[43px] w-[79%] ml-[19%] text-[13px] mt-8 text-white font-[500] uppercase rounded`}
                >
                  {`${cloudLoading && "processing image please wait"}`}
                </button>
              )}
              {!cloudLoading && (
                <button
                  onClick={handleUpdate}
                  disabled={updateLoading}
                  className={`${
                    updateLoading
                      ? "animate-pulse mt-[40px]"
                      : "text-sm mt-[40px]"
                  } bg-green-600 h-[43px] w-[81%] ml-[17%] text-[13px] mt-8 text-white font-[500] uppercase rounded`}
                >
                  {`${updateLoading ? "Updating..." : "Update"}`}
                </button>
              )}
              {adminInfo?.masterAdmin && (
                <>
                  {!showModal && (
                    <button
                      className="mt-4 delete-btn  h-[43px]  text-[13px] w-[81%] ml-[17%] text-white font-[500] uppercase rounded"
                      onClick={() => setModal(!showModal)}
                    >
                      DELETE DEVELOPER
                    </button>
                  )}
                </>
              )}
              {/*  */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Edit;
