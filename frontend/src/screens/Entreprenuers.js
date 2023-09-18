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
          <h1 className="text-[20px] ml-8 mb-6 font-[500] text-green-600">
            Entrepreneurs
          </h1>
          <div className="search_container">
            <input
              type="search"
              className=""
              placeholder="Search by Name , Email , Phone , Year , Bussiness"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {/*  */}

          {loading ? (
            <img src={loader} alt="" className="loading_image" />
          ) : (
            <div className="mt-8 mr-6 bg-white shadow rounded">
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
