/** @format */
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import User2 from "../components/User2";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { listDevelopers } from "../Redux/Actions/DeveloperAction";
import { NavLink } from "react-router-dom";

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
        <div className="ml-[250px] mt-4 mb-4">
          <h1 className="text-[24px] mb-6 font-semibold text-green-600">
            Developers
          </h1>
          <div className="search_container">
            <input
              type="search"
              className=""
              placeholder="Search by Name , Email , Phone , Cohort"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {/*  */}
          <div className="mt-8 w-[1100px] bg-white shadow rounded">
            {developers?.length >= 1 ? (
              <User2 data={search(developers)} />
            ) : (
              <div className="ml-[360px] pb-[300px] mt-[200px]">
                <h3>You have no developers yet</h3>
                <NavLink to="/CreateDevelopers" className="text-green-600">
                  click here to create developers
                </NavLink>
              </div>
            )}
            {loading && (
              <img src="/images/loader2.png" alt="" className="loading_image" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Entreprenuers;
