/** @format */
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Recruitment from "./screens/Recruitment";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<HomeScreen />} />
          <Route path="/New_Entrepreneur" exact element={<Recruitment />} />{" "}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
