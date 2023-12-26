/** @format */
import { useState } from "react";
import Sidebar from "../components/Sidebar";

function NewCommunity() {
  const loading = false;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [whatsappChannel, setWhatsappChannel] = useState("");
  const [numberOfMembers, setNumberOfMembers] = useState("");

  return (
    <div className="flex justify-between">
      <div className="flex-1">
        <Sidebar />
      </div>
      <div className="mt-4 mb-4 flex-4">
        <div className="p-[14px] rounded-[6px] w-[1100px]  bg-green-600 mr-4 mb-4">
          <h1 className="text-[18px] font-[500] text-white">New community</h1>
        </div>
        {/*  */}
        <div className="flex flex-col mt-4">
          <input
            className="h-[43px] border-[1.8px] border-gray-600 w-[98%] outline-1 p-2 rounded my-2"
            disabled={loading}
            required
            placeholder="Community name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="h-[43px] border-[1.8px] border-gray-600 w-[98%] outline-1 p-2 rounded my-2"
            disabled={loading}
            placeholder="Community description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="h-[43px] border-[1.8px] border-gray-600 w-[98%] outline-1 p-2 rounded my-2"
            disabled={loading}
            required
            placeholder="Whatsapp channel link"
            type="text"
            value={whatsappChannel}
            onChange={(e) => setWhatsappChannel(e.target.value)}
          />
          <input
            className="h-[43px] border-[1.8px] border-gray-600 w-[98%] outline-1 p-2 rounded my-2"
            disabled={loading}
            required
            placeholder="Number of members"
            type="number"
            value={numberOfMembers}
            onChange={(e) => setNumberOfMembers(e.target.value)}
          />
        </div>

        <button
          className={`${
            loading && "animate-pulse text-[12px] font-semibold"
          } bg-green-600 h-[46px] w-[98%] mt-8 text-white font-[500] uppercase rounded`}
        >
          CREATE
        </button>
      </div>
    </div>
  );
}

export default NewCommunity;
