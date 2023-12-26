/** @format */
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Recruitment from "./screens/Recruitment";
import Entreprenuers from "./screens/Entreprenuers";
import Developers from "./screens/Developers";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import CreateDev from "./screens/CreateDev";
import CreateAdmin from "./screens/CreateAdmin";
import DevProfile from "./screens/DevProfile";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./PrivateRoute";
import PasswordUpdateScreen from "./screens/PasswordUpdateScreen";
import ForgotPassword from "./screens/ForgotPassword";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import NewCommunity from "./screens/NewCommunity";
import Communities from "./screens/Communities";
import CommunityProfile from "./screens/CommunityProfile";
import NewProgram from "./screens/NewProgram";
import Programs from "./screens/Programs";
import ProgramProfile from "./screens/ProgramProfile";

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Toaster
          toastOptions={{
            className: "",
            style: {
              color: "white",
              background: "green",
              border: "2px solid lightgreen",
            },
          }}
        />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              exact
              element={
                <PrivateRoute>
                  <HomeScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/New_Entrepreneur"
              element={
                <PrivateRoute>
                  {" "}
                  <Recruitment />{" "}
                </PrivateRoute>
              }
            />{" "}
            <Route
              path="/Entrepreneurs"
              element={
                <PrivateRoute>
                  <Entreprenuers />{" "}
                </PrivateRoute>
              }
            />{" "}
            <Route
              path="/CreateDevelopers"
              element={
                <PrivateRoute>
                  {" "}
                  <CreateDev />{" "}
                </PrivateRoute>
              }
            />{" "}
            <Route
              path="/Developers"
              element={
                <PrivateRoute>
                  <Developers />{" "}
                </PrivateRoute>
              }
            />{" "}
            <Route
              path="/Developers/DevProfile/:id"
              element={
                <PrivateRoute>
                  <DevProfile />{" "}
                </PrivateRoute>
              }
            />{" "}
            <Route path="/Login" element={<Login />} />{" "}
            <Route path="/Update_Password" element={<PasswordUpdateScreen />} />{" "}
            <Route path="/Forgot_Password" element={<ForgotPassword />} />{" "}
            <Route
              path="/Entrepreneurs/Profile/:id"
              element={
                <PrivateRoute>
                  <Profile />{" "}
                </PrivateRoute>
              }
            />{" "}
            <Route
              path="/NewCommunity"
              element={
                <PrivateRoute>
                  <NewCommunity />{" "}
                </PrivateRoute>
              }
            />{" "}
            <Route
              path="/Communities"
              element={
                <PrivateRoute>
                  <Communities />{" "}
                </PrivateRoute>
              }
            />{" "}
            <Route
              path="/Communities/Profile/:id"
              element={
                <PrivateRoute>
                  <CommunityProfile />{" "}
                </PrivateRoute>
              }
            />{" "}
            <Route
              path="/NewProgram"
              element={
                <PrivateRoute>
                  <NewProgram />{" "}
                </PrivateRoute>
              }
            />{" "}
            <Route
              path="/Programs"
              element={
                <PrivateRoute>
                  <Programs />{" "}
                </PrivateRoute>
              }
            />{" "}
            <Route
              path="/Programs/Profile/:id"
              element={
                <PrivateRoute>
                  <ProgramProfile />{" "}
                </PrivateRoute>
              }
            />{" "}
            <Route
              path="/CreateAdmin"
              element={
                <PrivateRoute>
                  {" "}
                  <CreateAdmin />
                </PrivateRoute>
              }
            />{" "}
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </div>
  );
}

export default App;
