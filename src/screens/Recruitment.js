/** @format */
import React, { useRef } from "react";
import Sidebar from "../components/Sidebar";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

function HomeScreen() {
  const filePicker = useRef(null);

  return (
    <div>
      <div className="flex justify-between">
        <Sidebar />
        <div className="ml-[250px] mt-4 mb-4 w-full">
          <h1 className="text-3xl mb-4 w-full">Recruitment</h1>
          <div>
            <h2>Add new recruiter</h2>
          </div>
          {/*  */}
          <div className="form_container shadow">
            <div className="flex_div">
              <div className="image_div">
                <img
                  src="https://images.vexels.com/media/users/3/129733/isolated/preview/a558682b158debb6d6f49d07d854f99f-casual-male-avatar-silhouette.png"
                  alt=""
                  className=""
                />
                <input type="file" hidden ref={filePicker} />
                <CameraAltOutlinedIcon
                  className="camera"
                  onClick={() => filePicker.current.click()}
                />
              </div>
              <div className="input_div">
                <label>Full Name</label>
                <input type="text" />
                <label>Email</label>
                <input type="text" />
                <label>Phone</label>
                <input type="number" />
              </div>
              <div className="select_div">
                <label>Year</label>
                <input type="number" />
                <label>Bussiness Type</label>
                <select>
                  <option value="Employment">Employment</option>
                  <option value="Entreprenuer">Entreprenuer</option>
                </select>
              </div>
            </div>
            <button>Create</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
