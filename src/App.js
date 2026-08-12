import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./features/Home";
import { useState } from "react";
import Login from "./features/Login";
import Navbar from "./features/Navbar";
import Layout from "./features/Layout";
import Users from "./features/Users";
import UserForm from "./features/UserForm/UserForm";
import RadarChart from "./features/RadarChart";
import Chart from "./features/Chart";
import Test from "./features/Test";
import Horizontal from "./features/Horizontal";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(loggedIn, "loggedInloggedIn");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Test />}>

            <Route index element={<Home />} />
          </Route>
            <Route path="/horizontal" element={<Horizontal/>} />
          <Route path="/nav" element={<Navbar />} />
          <Route path="/users" element={<Users />} />
          <Route path="/userform" element={<UserForm />} />
          <Route path="/radarchart" element={<RadarChart />} />
          <Route path="/chart" element={<Chart />} />
          <Route path="/test" element={<Test />} />
        </Routes>
        <button
          onClick={() => {
            setLoggedIn(!loggedIn);
          }}
        >
          press
        </button>
      </BrowserRouter>
    </>
  );
}

export default App;
