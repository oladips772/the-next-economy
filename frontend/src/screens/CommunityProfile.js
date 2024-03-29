/** @format */
import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import URL from "../url";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import loader from "../images/loader2.png";

function CommunityProfile() {
  const navigate = useNavigate();
  let params = useParams();
  const communityId = params.id;
  const [getLoading, setGetLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [community, setCommunity] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [whatsappChannel, setWhatsappChannel] = useState("");
  const [numberOfMembers, setNumberOfMembers] = useState("");

  // ? getting community details
  useEffect(() => {
    const GetCommunity = async () => {
      try {
        const { data } = await axios.get(
          `${URL}/api/communities/${communityId}`
        );
        setCommunity(data);
      } catch (error) {
        toast.error(error?.response?.data?.error);
      }
      setGetLoading(false);
    };
    GetCommunity();
  }, [communityId]);

  // ? updating community details

  useEffect(() => {
    if (community) {
      setName(community?.name);
      setDescription(community?.description);
      setWhatsappChannel(community?.whatsappChannel);
      setNumberOfMembers(community?.numberOfMembers);
    }
  }, [community]);

  const update = async () => {
    setUpdateLoading(true);
    try {
      await axios.put(`${URL}/api/communities/${communityId}`, {
        name,
        description,
        whatsappChannel,
        numberOfMembers,
      });
      toast.success("Updated successfully");
      navigate("/Communities");
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
    setUpdateLoading(false);
  };

  // ? delete
  const Delete = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(`${URL}/api/communities/${communityId}`);
      toast.success("Deleted successfully");
      navigate("/Communities");
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
          <div className="p-[16px] rounded-[6px] w-[1100px] bg-[#182237] mr-4 mb-4">
            <h1 className="text-[16px] font-[400] text-white">Community</h1>
          </div>
          {/*  */}
          <div className="flex flex-col mt-4">
            <input
              className="h-[43px] border-[1.8px] border-gray-200 text-gray-200 w-[98%] outline-1 p-2 rounded my-2"
              required
              placeholder="Community name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="h-[43px] border-[1.8px] border-gray-200 text-gray-200 w-[98%] outline-1 p-2 rounded my-2"
              placeholder="Community description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="h-[43px] border-[1.8px] border-gray-200 text-gray-200 w-[98%] outline-1 p-2 rounded my-2"
              required
              placeholder="Whatsapp channel link"
              type="text"
              value={whatsappChannel}
              onChange={(e) => setWhatsappChannel(e.target.value)}
            />
            <input
              className="h-[43px] border-[1.8px] border-gray-200 text-gray-200 w-[98%] outline-1 p-2 rounded my-2"
              required
              placeholder="Number of members"
              type="number"
              value={numberOfMembers}
              onChange={(e) => setNumberOfMembers(e.target.value)}
            />
          </div>

          <button
            onClick={update}
            className={`${
              updateLoading && "animate-pulse text-[13px] font-semibold"
            } bg-green-500 text-[13px] h-[43px] w-[98%] mt-8 text-white font-[500] uppercase rounded`}
          >
            {updateLoading ? "updating.." : "update"}
          </button>
          <button
            onClick={Delete}
            className={`${
              deleteLoading && "animate-pulse text-[13px] font-semibold"
            } bg-red-600 text-[13px] h-[43px] w-[98%] mt-4 text-white font-[500] uppercase rounded`}
          >
            {deleteLoading ? "deleting.." : "delete"}
          </button>
        </div>
      )}
    </div>
  );
}

export default CommunityProfile;
