/** @format */
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Recruitment from "./screens/Recruitment";
import Entreprenuers from "./screens/Entreprenuers";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import CreateAdmin from "./screens/CreateAdmin";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster
        toastOptions={{
          className: "",
          style: {
            color: "white",
            background: "rgb(9, 145, 9)",
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<HomeScreen />} />
          <Route path="/New_Entrepreneur" element={<Recruitment />} />{" "}
          <Route path="/Entrepreneurs" element={<Entreprenuers />} />{" "}
          <Route path="/Login" element={<Login />} />{" "}
          <Route path="/Profile/:id" element={<Profile />} />{" "}
          <Route path="/CreateAdmin" element={<CreateAdmin />} />{" "}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
