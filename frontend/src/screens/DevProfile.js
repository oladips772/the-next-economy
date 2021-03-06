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
import moment from "moment";

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
    }
    if (success) {
      toast.success("profile updated successfully");
      window.location.reload();
    }
  }, [errorUpdate, success]);

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
          <img src="/images/loader2.png" alt="" className="loading_image" />
        ) : (
          <div className="ml-[250px] mt-4 mb-4 w-full">
            <div className="flex justify-between w-full items-center">
              <h1 className="text-[24px] mb-6 font-semibold text-green-600">
                Dev Profile
              </h1>
              <PrintIcon
                className=" text-green-600 h-12 w-12 mr-6 rounded-full cursor-pointer text-2xl"
                onClick={() => setPrint(!showPrint)}
              />
            </div>
            <div></div>
            {/*  */}
            <div className="edit_container shadow">
              <div className="edit_wrapper">
                <div className="edit_image_div">
                  <img
                    src={`${selectedImage ? selectedImage : developerImage}`}
                    alt=""
                    className=""
                  />
                  <input
                    type="file"
                    ref={filePicker}
                    hidden
                    onChange={handleChange}
                  />
                  {!updateLoading && (
                    <CameraAltOutlinedIcon
                      className="camera"
                      onClick={() => filePicker.current.click()}
                    />
                  )}
                </div>
                <div className="">
                  <label className="font-semibold">Full Name</label>
                  <input
                    disabled={updateLoading}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label className="font-semibold">Email</label>
                  <input
                    disabled={updateLoading}
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="font-semibold">Phone</label>
                  <input
                    disabled={updateLoading}
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="">
                  <label className="font-semibold">Cohort</label>
                  <input
                    disabled={updateLoading}
                    type="text"
                    value={cohort}
                    onChange={(e) => setCohort(e.target.value)}
                  />
                  <label className="font-semibold">Linked ID</label>
                  <input
                    disabled={updateLoading}
                    type="text"
                    value={linkedinId}
                    onChange={(e) => setLinkedinId(e.target.value)}
                  />
                  <label className="font-semibold">Facebook ID</label>
                  <input
                    className="mb-4"
                    disabled={updateLoading}
                    type="text"
                    value={facebookId}
                    onChange={(e) => setFacebookId(e.target.value)}
                  />
                  <label className="font-semibold mb-[6px]">
                    Payment Status
                  </label>
                  <select
                    className="mt-[4px]"
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
                      <label className="font-semibold my-4">
                        Payment Balance
                      </label>
                      <input
                        disabled={loading}
                        required
                        type="number"
                        value={paymentBalance}
                        onChange={(e) => setPaymentBalance(e.target.value)}
                      />
                    </>
                  )}
                  <label className="font-semibold mb-[6px]">Remarks</label>
                  <textarea
                    disabled={updateLoading}
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  ></textarea>

                  <label className="font-semibold">Gender</label>
                  <select
                    className="mt-[5px]"
                    onChange={(e) => setGender(e.target.value)}
                    disabled={updateLoading}
                  >
                    <option value={gender}>{gender}</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                  {cloudLoading && (
                    <button
                      className={`${
                        cloudLoading && "animate-pulse text-sm mt-[40px]"
                      }`}
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
                      }`}
                    >
                      {`${updateLoading ? "Updating..." : "Update"}`}
                    </button>
                  )}
                  {adminInfo?.masterAdmin && (
                    <>
                      {!showModal && (
                        <button
                          className="mt-6 delete-btn"
                          onClick={() => setModal(!showModal)}
                        >
                          DELETE DEVELOPER
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
              {/*  */}
              <div className="display_container shadow">
                <div className="top_info">
                  <img src={developer.image} alt="" />
                  <div className="top_info_side">
                    <span>Full Name</span>
                    <p>{developer.name}</p>
                    <span>Email</span>
                    <p>
                      <a href={`mailto:${developer.email}`} target="_blank">
                        {developer.email}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="bottom_info">
                  <span>Cohort</span>
                  <p>{developer.cohort}</p>
                  <span>Phone</span>
                  <p>{developer.phone}</p>
                  <span>Payment Status</span>
                  <p>{developer.paymentStatus}</p>
                  {developer.paymentBalance && (
                    <>
                      <span>Payment Balance</span>
                      <p>NGN {developer.paymentBalance},000</p>
                    </>
                  )}
                </div>
                {adminInfo.masterAdmin && (
                  <>
                    <div className="flex items-center mt-4  w-full ml-2">
                      <h2 className="font-[600] text-[13px]">CREATED BY : </h2>
                      <p className="font-[500] text-[14px]  ml-[4px]">
                        {developer?.createdBy === adminInfo.name
                          ? "you"
                          : developer?.createdBy}{" "}
                        on {""}
                        {moment(developer?.createdAt).format("LL")}
                      </p>
                    </div>
                    <div className="flex items-center mt-1 w-full ml-2">
                      <h2 className="0 font-[600] text-[13px]">
                        LASTLY UPDATED BY :{" "}
                      </h2>
                      <p className="font-[500] text-[14px]  ml-[4px]">
                        {developer?.updatedBy === adminInfo.name
                          ? "you"
                          : developer?.updatedBy}{" "}
                        on {""}
                        {moment(developer?.updatedAt).format("LL")}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Edit;
