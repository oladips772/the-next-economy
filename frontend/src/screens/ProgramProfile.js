/** @format */
import axios from "axios";
import URL from "../url";
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { DatePicker } from "@mui/x-date-pickers";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import loader from "../images/loader2.png";
import moment from "moment";

function ProgramProfile() {
  const params = useParams();
  const { id } = params;
  const [getLoading, setGetLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfIntakes, setNumberOfIntakes] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [status, setStatus] = useState("Not Started");
  const [program, setProgram] = useState();
  const [newStartDate, setNewStartDate] = useState();
  const [newEndDate, setNewEndDate] = useState();
  const navigate = useNavigate();

  // ? get program details
  useEffect(() => {
    const GetProgram = async () => {
      try {
        const { data } = await axios.get(`${URL}/api/programs/${id}`);
        setProgram(data);
      } catch (error) {
        toast.error(error?.response?.data?.error);
      }
      setGetLoading(false);
    };
    GetProgram();
  }, [id]);

  // ? updating program details
  useEffect(() => {
    if (program) {
      setName(program?.name);
      setDescription(program?.description);
      setNumberOfIntakes(program?.numberOfIntakes);
      setStatus(program.status);
      setStartDate(program?.startDate);
      setEndDate(program?.endDate);
    }
  }, [program]);

  // ? update
  const update = async () => {
    setUpdateLoading(true);
    try {
      await axios.put(`${URL}/api/programs/${id}`, {
        name,
        description,
        numberOfIntakes,
        startDate: newStartDate && newStartDate?.toISOString(),
        endDate: newEndDate && newEndDate?.toISOString(),
        status,
      });
      toast.success("Program updated successfully");
      navigate("/Programs");
    } catch (error) {
      console.log(error);
    }
    setUpdateLoading(false);
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
          <div className="p-[14px] rounded-[6px] w-[1100px]  bg-green-600 mr-4 mb-4">
            <h1 className="text-[18px] font-[400] text-white">
              Program Details
            </h1>
          </div>
          {/*  */}
          <div className="flex flex-col mt-4">
            <input
              className="h-[43px] border-[1.8px] border-gray-600 w-[98%] outline-1 p-2 rounded my-2"
              required
              placeholder="Program name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="h-[43px] border-[1.8px] border-gray-600 w-[98%] outline-1 p-2 rounded my-2"
              placeholder="Program description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="h-[43px] border-[1.8px] border-gray-600 w-[98%] outline-1 p-2 rounded my-2"
              required
              placeholder="Number of beneficiaries"
              type="number"
              value={numberOfIntakes}
              onChange={(e) => setNumberOfIntakes(e.target.value)}
            />
            <div className="my-2 flex items-center space-x-3 w-[98%] mb-2">
              <DatePicker
                // value={startDate}
                label={moment(startDate).format("L")}
                className="h-[43px] w-[300px]"
                onChange={(newValue) => setNewStartDate(newValue)}
              />
              <DatePicker
                label={moment(endDate).format("L")}
                className="h-[43px] w-[300px]"
                onChange={(newValue) => setNewEndDate(newValue)}
              />
            </div>
            <label htmlFor="" className="mt-3 text-sm text-gray-700">
              Status
            </label>
            <select
              value={status}
              className="h-[43px] border-[1.8px] border-gray-600 w-[98%] outline-1 p-2 rounded mb-2"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Not Started">Not Started</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <button
            onClick={update}
            className={`${
              updateLoading && "animate-pulse text-[12px] font-semibold"
            } bg-green-600 h-[46px] w-[98%] mt-8 text-white font-[500] uppercase rounded`}
          >
            {updateLoading ? "updating.." : "update"}
          </button>
        </div>
      )}
    </div>
  );
}

export default ProgramProfile;
