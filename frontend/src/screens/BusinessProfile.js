/** @format */
import axios from "axios";
import URL from "../url";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import loader from "../images/loader2.png";

function BusinessProfile() {
  const params = useParams();
  const { id } = params;
  const [getLoading, setGetLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ownersName, setOwnersName] = useState("");
  const [ownersEmail, setOwnersEmail] = useState("");
  const [ownersNumber, setOwnersNumber] = useState("");
  const [location, setLocation] = useState("");
  const [business, setBusiness] = useState("");
  const navigate = useNavigate();
  const [deleteLoading, setDeleteLoading] = useState(false);

  // ? get business details
  useEffect(() => {
    const GetBusiness = async () => {
      try {
        const { data } = await axios.get(`${URL}/api/business/${id}`);
        setBusiness(data);
      } catch (error) {
        toast.error(error?.response?.data?.error);
      }
      setGetLoading(false);
    };
    GetBusiness();
  }, [id]);

  // ? updating business details
  useEffect(() => {
    if (business) {
      setName(business?.name);
      setDescription(business?.description);
      setOwnersName(business?.ownersName);
      setOwnersEmail(business.ownersEmail);
      setOwnersNumber(business?.ownersNumber);
      setLocation(business?.location);
    }
  }, [business]);

  // ? update
  const update = async () => {
    setUpdateLoading(true);
    try {
      await axios.put(`${URL}/api/business/${id}`, {
        name,
        description,
        ownersName,
        ownersEmail,
        ownersNumber,
        location,
      });
      toast.success("Business updated successfully");
      navigate("/Businesses");
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
    setUpdateLoading(false);
  };

  // ? delete
  const Delete = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(`${URL}/api/business/${id}`);
      toast.success("Deleted successfully");
      navigate("/Businesses");
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
    setDeleteLoading(false);
  };

  return (
    <div className="flex justify-between">
      <div className="flex-1">
        <Sidebar />
      </div>
      {getLoading ? (
        <img src={loader} alt="" className="loading_image" />
      ) : (
        <div className="mt-4 mb-4 flex-4">
          <div className="p-[16px] rounded-[3px] w-[1100px]  bg-[#182237] mr-4 mb-4">
            <h1 className="text-[18px] font-[400] text-white">
              Business Profile
            </h1>
          </div>
          {/*  */}
          <div className="flex flex-col mt-4">
            <input
              className="h-[43px] border-[1.8px] border-gray-400 w-[98%] outline-1 text-white bg-[#000000] p-2 rounded my-2"
              required
              placeholder="Business name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="h-[43px] border-[1.8px] border-gray-400 w-[98%] text-white outline-1 p-2 rounded my-2"
              placeholder="Business description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="h-[43px] border-[1.8px] border-gray-400 w-[98%] text-white outline-1 p-2 rounded my-2"
              required
              placeholder="Owners name"
              type="text"
              value={ownersName}
              onChange={(e) => setOwnersName(e.target.value)}
            />
            <input
              className="h-[43px] border-[1.8px] border-gray-400 w-[98%] outline-1 text-white p-2 rounded my-2"
              required
              placeholder="Owners Email"
              type="text"
              value={ownersEmail}
              onChange={(e) => setOwnersEmail(e.target.value)}
            />
            <input
              className="h-[43px] border-[1.8px] border-gray-400 w-[98%] outline-1 text-white p-2 rounded my-2"
              required
              placeholder="Owners Number"
              type="number"
              value={ownersNumber}
              onChange={(e) => setOwnersNumber(e.target.value)}
            />
            <input
              className="h-[43px] border-[1.8px] border-gray-400 w-[98%] outline-1 text-white p-2 rounded my-2"
              required
              placeholder="Location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <button
            onClick={update}
            className={`${
              updateLoading && "animate-pulse"
            } bg-green-500 h-[43px] w-[98%] mt-8 text-white text-[13px] font-[500] uppercase rounded`}
          >
            {updateLoading ? "updating.." : "update"}
          </button>
          <button
            onClick={Delete}
            className={`${
              deleteLoading && "animate-pulse"
            } bg-red-600 h-[43px] w-[98%] mt-4 text-white text-[13px] font-[500] uppercase rounded`}
          >
            {deleteLoading ? "deleting.." : "delete"}
          </button>
        </div>
      )}
    </div>
  );
}

export default BusinessProfile;
