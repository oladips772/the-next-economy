/** @format */
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { NavLink } from "react-router-dom";
import ProgramsData from "../components/ProgramsData";
import loader from "../images/loader2.png";
import axios from "axios";
import URL from "../url";

function Programs() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [programs, setPrograms] = useState([]);

  // ? search function
  const search = (data) => {
    return data?.filter((person) => person?.name.toLowerCase().includes(query));
  };

  useEffect(() => {
    const getPrograms = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${URL}/api/programs`);
        setPrograms(data);
      } catch (error) {}
      setLoading(false);
    };
    getPrograms();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <Sidebar />
        <div className="ml-[250px] mt-4 mb-4 w-[80%]">
          <div className="bg-[#182237] p-3 flex items-center justify-between rounded">
            <h1 className="text-[16px]  font-[400] text-white">Programs</h1>
            <div className="">
              <input
                type="search"
                className="h-[38px] p-3 w-[200px] text-white rounded-[25px] placeholder:text-gray-200 text-[15px] border border-gray-300"
                placeholder="Search by Name"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          {/*  */}
          {loading ? (
            <img src={loader} alt="" className="loading_image" />
          ) : (
            <div className="mt-8 mr-2 ">
              {programs?.length >= 1 ? (
                <ProgramsData data={search(programs)} />
              ) : (
                <div className="ml-[360px] pb-[300px] mt-[200px]">
                  <h3 className="text-gray-200">You have no programs yet</h3>
                  <NavLink to="/NewProgram" className="text-[lime]">
                    click here to create programs
                  </NavLink>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Programs;
