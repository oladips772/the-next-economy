/** @format */
import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import HomeHeader from "../components/HomeHeader";
import HomeScreenStaffs from "../components/HomeScreenStaffs";
import { useDispatch, useSelector } from "react-redux";
import { listEntrepreneurs } from "../Redux/Actions/EntrepreneurAction";
import { listDevelopers } from "../Redux/Actions/DeveloperAction";
import { GetCommunities } from "../Redux/Actions/CommunityAction";
import { GetPrograms } from "../Redux/Actions/ProgramAction";

function HomeScreen() {
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

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex-[1]">
          <Sidebar />
        </div>
        <div className="flex-[4.5] mt-4 mb-4">
          <div className="p-[14px] rounded-[6px]  bg-green-600 mr-4 mb-4">
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
          <HomeScreenStaffs entrepreneurs={entrepreneurs} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
