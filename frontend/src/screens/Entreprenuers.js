/** @format */
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import axios from "axios";

function Entreprenuers() {
  const [query, setQuery] = useState("");
  const [entrepreneurs, setEntrepreneurs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const  data  = await axios.get("/api/entrepreneurs");
      setEntrepreneurs(data.json());
    };
    fetchData();
  }, []);

  const search = (data) => {
    return data?.filter(
      (person) =>
        person?.name.toLowerCase().includes(query) ||
        person?.email.toString().includes(query) ||
        person?.bussiness.toLowerCase().includes(query) ||
        person?.phone.toLowerCase().includes(query) ||
        person?.year.toString().includes(query)
    );
  };

  return (
    <div>
      <div className="flex justify-between">
        <Sidebar />
        <div className="ml-[250px] mt-4 mb-4">
          <h1 className="text-3xl mb-4 w-full">Entrepreneurs</h1>
          <div className="search_container">
            <input
              type="search"
              className=""
              placeholder="Search by Name , Email ,Phone, Year, Bussiness "
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {/*  */}
          <div className="mt-8 w-[1100px] bg-white shadow rounded">
            <User data={search(entrepreneurs)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Entreprenuers;
