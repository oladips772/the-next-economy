/** @format */
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import URL from "../url";
import toast from "react-hot-toast";

function NewBusiness() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ownersName, setOwnersName] = useState("");
  const [ownersEmail, setOwnersEmail] = useState("");
  const [ownersNumber, setOwnersNumber] = useState("");
  const [location, setLocation] = useState("");

  // ? create function
  const create = async () => {
    setLoading(true);
    try {
      await axios.post(`${URL}/api/business/create`, {
        name,
        description,
        ownersName,
        ownersEmail,
        ownersNumber,
        location,
      });
      toast.success("Business created successfully");
      setName("");
      setDescription("");
      setOwnersName("");
      setOwnersEmail("");
      setOwnersNumber("");
      setLocation("");
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-between">
      <div className="flex-1">
        <Sidebar />
      </div>
      <div className="mt-4 mb-4 flex-4">
        <div className="p-[14px] rounded-[6px] w-[1100px] bg-[#182237] mr-4 mb-4">
          <h1 className="text-[18px] font-[500] text-white">New Business</h1>
        </div>
        {/*  */}
        <div className="flex flex-col mt-4">
          <input
            className="h-[43px] border-[1.8px] border-gray-200 text-gray-200 w-[98%] outline-1 p-2 rounded my-2"
            required
            placeholder="Business name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="h-[43px] border-[1.8px] border-gray-200 text-gray-200 w-[98%] outline-1 p-2 rounded my-2"
            placeholder="Business description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="h-[43px] border-[1.8px] border-gray-200 text-gray-200 w-[98%] outline-1 p-2 rounded my-2"
            required
            placeholder="Owners name"
            type="text"
            value={ownersName}
            onChange={(e) => setOwnersName(e.target.value)}
          />
          <input
            className="h-[43px] border-[1.8px] border-gray-200 text-gray-200 w-[98%] outline-1 p-2 rounded my-2"
            required
            placeholder="Owners Email"
            type="text"
            value={ownersEmail}
            onChange={(e) => setOwnersEmail(e.target.value)}
          />
          <input
            className="h-[43px] border-[1.8px] border-gray-200 text-gray-200 w-[98%] outline-1 p-2 rounded my-2"
            required
            placeholder="Owners Number"
            type="number"
            value={ownersNumber}
            onChange={(e) => setOwnersNumber(e.target.value)}
          />
          <input
            className="h-[43px] border-[1.8px] border-gray-200 text-gray-200 w-[98%] outline-1 p-2 rounded my-2"
            required
            placeholder="Location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <button
          onClick={create}
          className={`${
            loading && "animate-pulse text-[13px] font-semibold"
          } bg-green-500 h-[43px] text-[13px] w-[98%] mt-8 text-white font-[500] uppercase rounded`}
        >
          {loading ? "creating.." : "CREATE"}
        </button>
      </div>
    </div>
  );
}

export default NewBusiness;
