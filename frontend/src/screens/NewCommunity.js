/** @format */
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { CreateCommunity } from "../Redux/Actions/CommunityAction";

function NewCommunity() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [whatsappChannel, setWhatsappChannel] = useState("");
  const [numberOfMembers, setNumberOfMembers] = useState("");
  const { loading, success, error } = useSelector(
    (state) => state.createCommunity
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "CREATE_COMMUNITY_RESET" });
    } else if (success) {
      toast.success("Community created successfully");
      setName("");
      setDescription("");
      setWhatsappChannel("");
      setNumberOfMembers("");
      dispatch({ type: "CREATE_COMMUNITY_RESET" });
    }
  }, [success, error, dispatch]);

  const create = () => {
    if (!name.trim()) {
      return toast.error("Community name is required");
    }
    if (!description.trim()) {
      return toast.error("Community description is required");
    }
    if (!whatsappChannel.trim()) {
      return toast.error("Whatsapp channel link is required");
    }
    if (!numberOfMembers) {
      return toast.error("Number of members is required");
    }

    dispatch(
      CreateCommunity(name, description, whatsappChannel, numberOfMembers)
    );
  };

  return (
    <div className="flex justify-between">
      <div className="flex-1">
        <Sidebar />
      </div>
      <div className="mt-4 mb-4 flex-4">
        <div className="p-[16px] rounded-[6px] w-[1100px] bg-[#182237] mr-4 mb-4">
          <h1 className="text-[16px] font-[400] text-white">New community</h1>
        </div>
        {/*  */}
        <div className="flex flex-col mt-4">
          <input
            className="h-[43px] border-[1.8px] border-gray-200 text-gray-200 w-[98%] outline-1 p-2 rounded my-2"
            disabled={loading}
            required
            placeholder="Community name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="h-[43px] border-[1.8px] border-gray-200 text-gray-200 w-[98%] outline-1 p-2 rounded my-2"
            disabled={loading}
            placeholder="Community description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="h-[43px] border-[1.8px] border-gray-200 text-gray-200 w-[98%] outline-1 p-2 rounded my-2"
            disabled={loading}
            required
            placeholder="Whatsapp channel link"
            type="text"
            value={whatsappChannel}
            onChange={(e) => setWhatsappChannel(e.target.value)}
          />
          <input
            className="h-[43px] border-[1.8px] border-gray-200 text-gray-200 w-[98%] outline-1 p-2 rounded my-2"
            disabled={loading}
            required
            placeholder="Number of members"
            type="number"
            value={numberOfMembers}
            onChange={(e) => setNumberOfMembers(e.target.value)}
          />
        </div>

        <button
          onClick={create}
          className={`${
            loading && "animate-pulse text-[13px] font-semibold"
          } bg-green-600 h-[43px] w-[98%] mt-8 text-[13px] text-white font-[500] uppercase rounded`}
        >
          {loading ? "creating.." : "CREATE"}
        </button>
      </div>
    </div>
  );
}

export default NewCommunity;
