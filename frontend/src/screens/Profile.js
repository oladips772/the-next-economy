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
            <h1 className="text-[24px] mb-6 font-semibold text-green-600">
              Profile
            </h1>
            <div></div>
            {/*  */}
            <div className="edit_container shadow">
              <div className="edit_wrapper">
                <div className="edit_image_div">
                  <img src={`${entrepreneur?.image}`} alt="" className="" />
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
                  <label className="font-semibold">Biography</label>
                  <textarea
                    disabled={updateLoading}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                  <label className="font-semibold">Bussiness Sector</label>
                  <select
                    onChange={(e) => setBussiness(e.target.value)}
                    disabled={updateLoading}
                  >
                    <option value={bussiness}>{bussiness}</option>
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
