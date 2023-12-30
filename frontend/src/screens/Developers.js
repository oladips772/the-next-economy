/** @format */
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import User2 from "../components/User2";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { listDevelopers } from "../Redux/Actions/DeveloperAction";
import { NavLink } from "react-router-dom";
import loader from "../images/loader2.png";

function Entreprenuers() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const developerList = useSelector((state) => state.developerList);
  const { loading, error, developers } = developerList;

  useEffect(() => {
    dispatch(listDevelopers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error("please check system status");
    }
  }, [error]);

  const search = (data) => {
    return data?.filter(
      (person) =>
        person?.name.toLowerCase().includes(query) ||
        person?.email.toLowerCase().includes(query) ||
        person?.phone.toString().includes(query) ||
        person?.cohort.toLowerCase().includes(query)
    );
  };

  return (
    <div>
      <div className="flex justify-between">
        <Sidebar />
        <div className="ml-[250px] mt-4 mb-4 w-[80%]">
          <div className="bg-[#182237] p-3 flex items-center justify-between rounded">
            <h1 className="text-[16px] font-[400] text-white">Developers</h1>
            <div className="">
              <input
                type="search"
                className="h-[38px] p-3 w-[210px] text-gray-200 rounded-[25px] placeholder:text-gray-200 text-[15px] border border-gray-300"
                placeholder="Search by Name, Email"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          {/*  */}
          {loading ? (
            <img src={loader} alt="" className="loading_image" />
          ) : (
            <div className="mt-6 mr-6">
              {developers?.length >= 1 ? (
                <User2 data={search(developers)} />
              ) : (
                <div className="ml-[360px] pb-[300px] mt-[200px]">
                  <h3 className="text-gray-200">You have no developers yet</h3>
                  <NavLink to="/CreateDevelopers" className="text-[lime]">
                    click here to create developers
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

export default Entreprenuers;
