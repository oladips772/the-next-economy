/** @format */
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import HomeHeader from "../components/HomeHeader";
import { useDispatch, useSelector } from "react-redux";
import { listEntrepreneurs } from "../Redux/Actions/EntrepreneurAction";
import { listDevelopers } from "../Redux/Actions/DeveloperAction";
import { GetCommunities } from "../Redux/Actions/CommunityAction";
import { GetPrograms } from "../Redux/Actions/ProgramAction";
import ProgramsData from "../components/ProgramsData";
import EventsCard from "../components/EventsCard";

import axios from "axios";
import URL from "../url";

function HomeScreen() {
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();
  const entrepreneurList = useSelector((state) => state.entrepreneurList);
  const { entrepreneurs, loading } = entrepreneurList;
  const developerList = useSelector((state) => state.developerList);
  const { developers, loading: developerLoading } = developerList;
  const { communities, loading: communitiesLoading } = useSelector(
    (state) => state.getCommunities
  );
  const { programsLoading, programs } = useSelector(
    (state) => state.getPrograms
  );
  useEffect(() => {
    dispatch(listEntrepreneurs());
    dispatch(listDevelopers());
    dispatch(GetCommunities());
    dispatch(GetPrograms());
  }, [dispatch]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const { data } = await axios.get(`${URL}/api/events`);
        setEvents(data);
      } catch (error) {
        console.log(error);
      }
    };
    getEvents();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex-[1]">
          <Sidebar />
        </div>
        <div className="flex-[4.5] mt-4 mb-4">
          <div className="p-[16px] rounded-[3px] bg-[#182237] mr-4 mb-4">
            <h1 className="text-[18px] font-[500] text-white">Dashboard</h1>
          </div>
          <HomeHeader
            programsLoading={programsLoading}
            programs={programs}
            entrepreneurs={entrepreneurs}
            loading={loading}
            developerLoading={developerLoading}
            developers={developers}
            communities={communities}
            communityLoading={communitiesLoading}
          />
          {programs?.length >= 1 && (
            <div className="mt-10 mr-12">
              <h1 className="text-gray-200 my-1 p-2 rounded bg-[#182237]">
                Some of your Programs
              </h1>
              <ProgramsData data={programs} />
            </div>
          )}
          {events?.length >= 1 && (
            <div className="mt-10 mr-12">
              <h1 className="text-gray-200 my-1 p-2 rounded bg-[#182237]">
                Some of your Events
              </h1>
              <EventsCard data={events} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
