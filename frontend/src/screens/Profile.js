/** @format */
import React from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import axios from "axios";

function Edit() {
  const [entrepreneur, setEntrepreneur] = React.useState({});
  let params = useParams();
  const filePicker = React.useRef(null);
  const [selectedImage, setSelectedImage] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/entrepreneurs/${params.id}`);
      setEntrepreneur(data);
    };
    fetchData();
  }, []);

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
          <h1 className="text-3xl mb-4 w-full">Profile</h1>
          <div></div>
          {/*  */}
          <div className="edit_container shadow">
            <div className="edit_wrapper">
              <div className="edit_image_div">
                <img
                  src={`${selectedImage ? selectedImage : entrepreneur.image}`}
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
                <input type="text" value={entrepreneur.name} />
                <label>Email</label>
                <input type="text" value={entrepreneur.email} />
                <label>Phone</label>
                <input type="number" value={entrepreneur.phone} />
              </div>
              <div className="">
                <label>Year</label>
                <input type="number" value={entrepreneur.year} />
                <label>Biography</label>
                <textarea></textarea>
                <label>Bussiness Sector</label>
                <select>
                  <option value={entrepreneur.bussiness}>
                    {entrepreneur.bussiness}
                  </option>
                  <option value="Entreprenuership">Entreprenuership</option>
                </select>
                <button>UPDATE</button>
              </div>
            </div>
            {/*  */}
            <div className="display_container shadow">
              <div className="top_info">
                <img src={entrepreneur.image} alt="" />
                <div className="top_info_side">
                  <span>Full Name</span>
                  <p>{entrepreneur.name}</p>
                  <span>Email</span>
                  <p>{entrepreneur.email}</p>
                </div>
              </div>
              <div className="bottom_info">
                <span>Bussiness</span>
                <p>{entrepreneur.bussiness}</p>
                <span>Phone</span>
                <p>{entrepreneur.phone}</p>
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
