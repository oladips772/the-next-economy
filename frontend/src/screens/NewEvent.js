/** @format */
import axios from "axios";
import URL from "../url";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { DatePicker } from "@mui/x-date-pickers";
import toast from "react-hot-toast";

function NewEvent() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfAttendees, setNumberOfAttendees] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [status, setStatus] = useState("Not Started");
  const [location, setLocation] = useState();

  const create = async () => {
    if (!name.trim()) {
      return toast.error("Event name is required");
    }
    if (!description.trim()) {
      return toast.error("Event description is required");
    }
    if (!numberOfAttendees) {
      return toast.error("Number of attendees is required");
    }
    if (!startDate) {
      return toast.error("Start date is required");
    }
    if (!endDate) {
      return toast.error("End date is required");
    }
    if (!location.trim()) {
      return toast.error("Event location is required");
    }
    setLoading(true);
    try {
      await axios.post(`${URL}/api/events/create`, {
        name,
        description,
        numberOfAttendees,
        startDate: startDate && startDate?.toISOString(),
        endDate: endDate && endDate?.toISOString(),
        status,
        location,
      });
      toast.success("Event created successfully");
      setName("");
      setDescription("");
      setNumberOfAttendees("");
      setStartDate("");
      setEndDate("");
      setLocation("");
    } catch (error) {
      toast.error(error?.response?.data?.error);
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-between">
      <div className="flex-1">
        <Sidebar />
      </div>
      <div className="mt-4 mb-4 flex-4">
        <div className="p-[16px] rounded-[6px] w-[1100px] bg-[#182237] mr-4 mb-4">
          <h1 className="text-[16px] font-[400] text-white">New Event</h1>
        </div>
        {/*  */}
        <div className="flex flex-col mt-4">
          <input
            className="h-[43px] border-[1.8px] border-gray-200 text-gray-200 w-[98%] outline-none p-2 rounded my-2"
            required
            placeholder="Event name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="h-[43px] border-[1.8px] border-gray-200 text-gray-200 w-[98%] outline-none p-2 rounded my-2"
            placeholder="Event description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="h-[43px] border-[1.8px] border-gray-200 text-gray-200 w-[98%] outline-none p-2 rounded my-2"
            required
            placeholder="Number of attendees"
            type="number"
            value={numberOfAttendees}
            onChange={(e) => setNumberOfAttendees(e.target.value)}
          />
          <div className="my-2 flex items-center space-x-3 w-[98%] mb-2">
            <DatePicker
              sx={{
                color: "#bbdefb",
                borderRadius: 2,
                borderWidth: 1,
                borderColor: "#2196f3",
                border: "1px solid",
                backgroundColor: "#182237",
                height: 60,
              }}
              label="Start Date"
              className="date h-[43px] w-[300px]"
              onChange={(newValue) => setStartDate(newValue)}
            />
            <DatePicker
              sx={{
                color: "#bbdefb",
                borderRadius: 2,
                borderWidth: 1,
                borderColor: "#2196f3",
                border: "1px solid",
                backgroundColor: "#182237",
                height: 60,
              }}
              label="End Date"
              className="date h-[43px] w-[300px]"
              onChange={(newValue) => setEndDate(newValue)}
            />
          </div>
          <input
            className="h-[43px] border border-gray-200 text-gray-200 w-[98%]  p-2 rounded mt-4"
            placeholder="Event location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <label htmlFor="" className="mt-3 text-sm text-gray-200">
            Status
          </label>
          <select
            className="h-[43px] border-[1.8px] bg-transparent border-gray-200 text-gray-200 w-[98%] outline-none p-2 rounded mb-2"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Not Started">Not Started</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
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

export default NewEvent;
