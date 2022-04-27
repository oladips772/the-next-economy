/** @format */
import React from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import {entrepreneurs} from "../data/entrepreneurs";

function Edit() {
  let params = useParams();
  const filePicker = React.useRef(null);
  const [selectedImage, setSelectedImage] = React.useState("");
  const entrepreneur = entrepreneurs.find(
    (entrepreneur) => entrepreneur.id === parseInt(params.id)
  );

  const handleChange = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedImage(readerEvent.target.result);
    };
  };

  return (
    <div>
      <div className="flex justify-between">
        <Sidebar />
        <div className="ml-[250px] mt-4 mb-4 w-full">
          <h1 className="text-3xl mb-4 w-full">Profile {params.id}  {entrepreneur.name}</h1>
          <div></div>
          {/*  */}
          <div className="edit_container shadow">
            <div className="edit_wrapper">
              <div className="edit_image_div">
                <img
                  src={`${
                    selectedImage
                      ? selectedImage
                      : "https://images.vexels.com/media/users/3/129733/isolated/preview/a558682b158debb6d6f49d07d854f99f-casual-male-avatar-silhouette.png"
                  }`}
                  alt=""
                  className=""
                />
                <input
                  className="display-none"
                  type="file"
                  hidden
                  ref={filePicker}
                  onChange={handleChange}
                />
                <CameraAltOutlinedIcon
                  className="camera"
                  onClick={() => filePicker.current.click()}
                />
              </div>
              <div className="">
                <label>Full Name</label>
                <input type="text" />
                <label>Email</label>
                <input type="text" />
                <label>Phone</label>
                <input type="number" />
              </div>
              <div className="">
                <label>Year</label>
                <input type="number" />
                <label>Biography</label>
                <textarea></textarea>
                <label>Bussiness Sector</label>
                <select>
                  <option value="Employment">Employment</option>
                  <option value="Entreprenuership">Entreprenuership</option>
                </select>
                <button>UPDATE</button>
              </div>
            </div>
            {/*  */}
            <div className="display_container shadow">
              <div className="top_info">
                <img
                  src="https://media.istockphoto.com/photos/portrait-of-smiling-african-american-man-outdoors-in-garden-at-home-picture-id1263789745?b=1&k=20&m=1263789745&s=170667a&w=0&h=JZCqX-ePc-9IoENh9QtcjfYUaEDSC-tvIzyhZvwMmZU="
                  alt=""
                />
                <div className="top_info_side">
                  <span>Full Name</span>
                  <p>Bolu dele</p>
                  <span>Email</span>
                  <p>delle@gmail.com</p>
                </div>
              </div>
              <div className="bottom_info">
                <span>Bussiness</span>
                <p>Enterpreneurship</p>
                <span>Phone</span>
                <p>09038580066</p>
                {/* <span>Year</span>
                <p>2022</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
