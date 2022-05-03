/** @format */
import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import HomeHeader from "../components/HomeHeader";
import HomeScreenStaffs from "../components/HomeScreenStaffs";
import { useDispatch, useSelector } from "react-redux";
import { listEntrepreneurs } from "../Redux/Actions/EntrepreneurAction";

function HomeScreen() {
  const dispatch = useDispatch();
  const entrepreneurList = useSelector((state) => state.entrepreneurList);
  const { entrepreneurs,loading } = entrepreneurList;

  useEffect(() => {
    dispatch(listEntrepreneurs());
  }, [dispatch]);


  return (
    <div>
      <div className="flex justify-between">
        <Sidebar />
        <div className="ml-[250px] mt-4 mb-4">
          <h1 className="text-3xl mb-4 w-full">Dashboard</h1>
          <HomeHeader entrepreneurs={entrepreneurs}/>
          <HomeScreenStaffs entrepreneurs={entrepreneurs} loading={loading}/>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
