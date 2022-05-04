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
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <div className="App">
      <Toaster
        toastOptions={{
          className: "",
          style: {
            color: "black",
            background: "white",
            border:"2px solid lightgreen"
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
          <Route path="/Login" element={<Login />} />{" "}
          <Route
            path="/Profile/:id"
            element={
              <PrivateRoute>
                <Profile />{" "}
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
    </div>
  );
}

export default App;
