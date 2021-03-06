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
        <Sidebar />
        {error && toast.error(error)}
        {loading ? (
          <img src="/images/loader2.png" alt="" className="loading_image" />
        ) : (
          <div className="ml-[250px] mt-4 mb-4 w-full">
            <div className="flex justify-between w-full items-center">
              <h1 className="text-[24px] mb-6 font-semibold text-green-600">
                Profile
              </h1>
              <PrintIcon
                className=" text-green-600 h-12 w-12 mr-6 rounded-full cursor-pointer text-2xl"
                onClick={() => setPrint(!showPrint)}
              />
            </div>
            {/*  */}
            <div className="edit_container shadow">
              <div className="edit_wrapper">
                <div className="edit_image_div">
                  <img
                    src={`${selectedImage ? selectedImage : entrepreneurImage}`}
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
                  <label className="font-semibold">Year</label>
                  <input
                    disabled={updateLoading}
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                  <label className="font-semibold">Linkedin ID</label>
                  <input
                    disabled={updateLoading}
                    type="text"
                    value={linkedinId}
                    onChange={(e) => setLinkedinId(e.target.value)}
                  />
                  <label className="font-semibold">Facebook ID</label>
                  <input
                    disabled={updateLoading}
                    type="text"
                    value={facebookId}
                    onChange={(e) => setFacebookId(e.target.value)}
                  />
                  <label className="font-semibold">Status</label>
                  <select
                    onChange={(e) => setStatus(e.target.value)}
                    value={status}
                    disabled={updateLoading}
                  >
                    <option value="Still in business">Still in business</option>
                    <option value="Not in business">Not in business </option>
                  </select>
                  <label className="font-semibold">Biography</label>
                  <textarea
                    disabled={updateLoading}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                  <label className="font-semibold">Bussiness Sector</label>
                  <select
                    className="mb-[40px]"
                    onChange={(e) => setBussiness(e.target.value)}
                    disabled={updateLoading}
                  >
                    <option value={bussiness}>{bussiness}</option>
                    <option value="Employmentability">Employmentability</option>
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
                  {cloudLoading && (
                    <button
                      className={`${
                        cloudLoading && "animate-pulse text-sm mt-4"
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
                          ? "animate-pulse mt-4"
                          : "text-sm mt-[20px]"
                      }`}
                    >
                      {`${updateLoading ? "Updating..." : "Update"}`}
                    </button>
                  )}
                  {adminInfo?.masterAdmin && (
                    <>
                      {!showModal && (
                        <button
                          disabled={updateLoading}
                          className="mt-6 delete-btn"
                          onClick={() => setModal(!showModal)}
                        >
                          DELETE ENTREPRENEUR
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
              {/*  */}
              <div className="display_container shadow">
                <div className="top_info">
                  <img src={entrepreneur.image} alt="" />
                  <div className="top_info_side">
                    <span>Full Name</span>
                    <p>{entrepreneur.name}</p>
                    <span>Email</span>
                    <p>
                      <a href={`mailto:${entrepreneur.email}`} target="_blank">
                        {entrepreneur.email}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="bottom_info">
                  <span>Bussiness</span>
                  <p>{entrepreneur.bussiness}</p>
                  <span>Phone</span>
                  <p>{entrepreneur.phone}</p>
                  <span>Status</span>
                  <p>{entrepreneur?.status}</p>
                </div>
                {adminInfo.masterAdmin && (
                  <>
                    <div className="flex items-center mt-4  w-full ml-2">
                      <h2 className="font-[600] text-[13px]">CREATED BY : </h2>
                      <p className="font-[500] text-[14px]  ml-[4px]">
                        {entrepreneur?.createdBy === adminInfo.name
                          ? "you"
                          : entrepreneur?.createdBy}{" "}
                        on {""}
                        {moment(entrepreneur?.createdAt).format("LL")}
                      </p>
                    </div>
                    <div className="flex items-center mt-1 w-full ml-2">
                      <h2 className="0 font-[600] text-[13px]">
                        LASTLY UPDATED BY :{" "}
                      </h2>
                      <p className="font-[500] text-[14px]  ml-[4px]">
                        {entrepreneur?.updatedBy === adminInfo.name
                          ? "you"
                          : entrepreneur?.updatedBy}{" "}
                        on {""}
                        {moment(entrepreneur?.updatedAt).format("LL")}
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
