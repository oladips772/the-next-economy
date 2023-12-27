/** @format */
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import loader from "../images/loader2.png";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { GetCommunities } from "../Redux/Actions/CommunityAction";
import CommunitiesCard from "../components/Communities";
import { NavLink } from "react-router-dom";

function Communities() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const { loading, error, communities } = useSelector(
    (state) => state.getCommunities
  );

  useEffect(() => {
    dispatch(GetCommunities());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error("please check system status");
    }
  }, [error]);

  const search = (data) => {
    return data?.filter((person) => person?.name.toLowerCase().includes(query));
  };

  return (
    <div>
      <div className="flex justify-between">
        <Sidebar />
        <div className="ml-[250px] mt-4 mb-4 w-[80%]">
          <div className="bg-green-600 p-3 flex items-center justify-between rounded">
            <h1 className="text-[17px]  font-[500] text-white">Communities</h1>
            <div className="">
              <input
                type="search"
                className="h-[38px] p-3 w-[300px] text-white rounded-[25px] placeholder:text-gray-200 text-[15px] border border-gray-200"
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
            <div className="mt-8 mr-2 bg-white shadow rounded">
              {communities?.length >= 1 ? (
                <CommunitiesCard data={search(communities)} />
              ) : (
                <div className="ml-[360px] pb-[300px] mt-[200px]">
                  <h3>You have no communities yet</h3>
                  <NavLink to="/NewCommunity" className="text-green-600">
                    click here to create communities
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

export default Communities;
