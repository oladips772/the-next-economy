/** @format */
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Recruitment from "./screens/Recruitment";
import Entreprenuers from "./screens/Entreprenuers";
import Login from "./screens/Login";
import Edit from "./screens/Edit";
import CreateAdmin from "./screens/CreateAdmin";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<HomeScreen />} />
          <Route path="/New_Entrepreneur" element={<Recruitment />} />{" "}
          <Route path="/Entrepreneurs" element={<Entreprenuers />} />{" "}
          <Route path="/Login" element={<Login />} />{" "}
          <Route path="/Edit" element={<Edit />} />{" "}
          <Route path="CreateAdmin" element={<CreateAdmin />} />{" "}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
