/** @format */
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import { useSelector, useDispatch } from "react-redux";
import { listEntrepreneurs } from "../Redux/Actions/EntrepreneurAction";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";


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
        <div className="ml-[250px] mt-4 mb-4">
          <h1 className="text-[24px] mb-6 font-semibold text-green-600">
        Developers
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
          <div className="mt-8 w-[1100px] bg-white shadow rounded">
            <User data={search(entrepreneurs)} />
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
