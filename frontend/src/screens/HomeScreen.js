/** @format */
import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import HomeHeader from "../components/HomeHeader";
import HomeScreenStaffs from "../components/HomeScreenStaffs";
import { useDispatch, useSelector } from "react-redux";
import { listEntrepreneurs } from "../Redux/Actions/EntrepreneurAction";
import { listDevelopers } from "../Redux/Actions/DeveloperAction";

function HomeScreen() {
  const dispatch = useDispatch();
  const entrepreneurList = useSelector((state) => state.entrepreneurList);
  const { entrepreneurs, loading } = entrepreneurList;
  const developerList = useSelector((state) => state.developerList);
  const { developers } = developerList;

  useEffect(() => {
    dispatch(listEntrepreneurs());
    dispatch(listDevelopers());
  }, [dispatch]);

  return (
    <div>
      <div className="flex justify-between">
        <Sidebar />
        <div className="ml-[250px] mt-4 mb-4">
          <h1 className="text-[24px] mb-6 font-semibold text-green-600">
            Dashboard
          </h1>
          <HomeHeader entrepreneurs={entrepreneurs} developers={developers} />
          <HomeScreenStaffs entrepreneurs={entrepreneurs} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
