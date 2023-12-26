/** @format */
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import { useSelector, useDispatch } from "react-redux";
import { listEntrepreneurs } from "../Redux/Actions/EntrepreneurAction";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import loader from "../images/loader2.png";


function Entreprenuers() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const entrepreneurList = useSelector((state) => state.entrepreneurList);
  const { loading, error, entrepreneurs } = entrepreneurList;

  useEffect(() => {
    dispatch(listEntrepreneurs());
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
        person?.bussiness.toLowerCase().includes(query) ||
        person?.phone.toString().includes(query) ||
        person?.year.toString().includes(query)
    );
  };

  return (
    <div>
      <div className="flex justify-between">
        <Sidebar />
        <div className="ml-[250px] mt-4 mb-4 w-[80%]">
          <div className="bg-green-600 p-3 flex items-center justify-between rounded">
            <h1 className="text-[17px]  font-[500] text-white">
              Entrepreneurs
            </h1>
            <div className="">
              <input
                type="search"
                className="h-[38px] p-3 w-[300px] text-white rounded-[25px] placeholder:text-gray-200 text-[15px] border border-gray-200"
                placeholder="Search by Name , Email.."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          {/*  */}

          {loading ? (
            <img src={loader} alt="" className="loading_image" />
          ) : (
            <div className="mt-8 mr-2 bg-white shadow rounded">
              {entrepreneurs?.length >= 1 ? (
                <User data={search(entrepreneurs)} />
              ) : (
                <div className="ml-[360px] pb-[300px] mt-[200px]">
                  <h3>You have no entrepreneurs yet</h3>
                  <NavLink to="/New_Entrepreneur" className="text-green-600">
                    click here to create entrepreneurs
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
