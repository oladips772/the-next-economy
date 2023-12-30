/** @format */
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import BusinessCard from "../components/BusinessCard";
import { NavLink } from "react-router-dom";
import loader from "../images/loader2.png";
import URL from "../url";

function Businesses() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [businesses, setBusinesses] = useState([]);

  // ? search function
  const search = (data) => {
    return data?.filter((person) => person?.name.toLowerCase().includes(query));
  };

  useEffect(() => {
    const getBusinesses = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${URL}/api/business`);
        setBusinesses(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getBusinesses();
  }, []);

  return (
    <div className="flex justify-between">
      <Sidebar />
      <div className="ml-[250px] mt-4 mb-4 w-[80%]">
        <div className="bg-[#182237] p-3 flex items-center justify-between rounded">
          <h1 className="text-[16px]  font-[400] text-white">Businesses</h1>
          <div className="">
            <input
              type="search"
              className="h-[38px] p-3 w-[200px] outline-none text-gray-300 rounded-[25px] placeholder:text-gray-300 text-[15px] border border-gray-400"
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
          <div className="mt-8 mr-2">
            {businesses?.length >= 1 ? (
              <BusinessCard data={search(businesses)} />
            ) : (
              <div className="ml-[360px] pb-[300px] mt-[200px]">
                <h3 className="text-gray-200">You have no businesses yet</h3>
                <NavLink to="/NewBusiness" className="text-[lime]">
                  click here to create businesses
                </NavLink>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Businesses;
