/** @format */
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  listEntrepreneur,
  updateEntrepreneur,
} from "../Redux/Actions/EntrepreneurAction";
import toast from "react-hot-toast";

function Edit() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(null);
  const [year, setYear] = useState(null);
  const [bussiness, setBussiness] = useState("");
  const [bio, setBio] = useState("");
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  let params = useParams();
  const entrepreneurId = params.id;

  const entrepreneurDetails = useSelector((state) => state.entrepreneurDetails);
  const { loading, error, entrepreneur } = entrepreneurDetails;

  const entrepreneurUpdate = useSelector((state) => state.entrepreneurUpdate);
  const {
    loading: updateLoading,
    error: errorUpdate,
    success,
  } = entrepreneurUpdate;

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateEntrepreneur(
        entrepreneurId,
        name,
        email,
        image,
        phone,
        year,
        bussiness,
        bio
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

  useEffect(() => {
    dispatch(listEntrepreneur(entrepreneurId));
  }, [dispatch, entrepreneurId]);

  useEffect(() => {
    if (entrepreneur) {
      setName(entrepreneur.name);
      setImage(entrepreneur.image);
      setEmail(entrepreneur.email);
      setPhone(entrepreneur.phone);
      setYear(entrepreneur.year);
      setBussiness(entrepreneur.bussiness);
      setBio(entrepreneur.bio);
    }
  }, [entrepreneur]);

  return (
    <div>
      <div className="flex justify-between">
        <Sidebar />
        {error && toast.error(error)}
        {loading ? (
          <img src="/images/loader2.png" alt="" className="loading_image" />
        ) : (
          <div className="ml-[250px] mt-4 mb-4 w-full">
            <h1 className="text-3xl mb-4 w-full">Profile</h1>
            <div></div>
            {/*  */}
            <div className="edit_container shadow">
              <div className="edit_wrapper">
                <div className="edit_image_div">
                  <img src={`${entrepreneur?.image}`} alt="" className="" />
                </div>
                <div className="">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label>Email</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label>Phone</label>
                  <input
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="">
                  <label>Year</label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                  <label>Biography</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                  <label>Bussiness Sector</label>
                  <select onChange={(e) => setBussiness(e.target.value)}>
                    <option value={bussiness}>{bussiness}</option>
                    <option value="Entrepreneurship">Entrepreneurship</option>
                    <option value="Employment">Employment</option>
                  </select>
                  <button
                    onClick={handleUpdate}
                    disabled={updateLoading}
                    className={`${updateLoading && "animate-pulse"}`}
                  >
                    {`${updateLoading ? "Updating..." : "Update"}`}
                  </button>
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
                    <p>{entrepreneur.email}</p>
                  </div>
                </div>
                <div className="bottom_info">
                  <span>Bussiness</span>
                  <p>{entrepreneur.bussiness}</p>
                  <span>Phone</span>
                  <p>{entrepreneur.phone}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Edit;
