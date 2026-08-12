import "./App.css";
import Home from "./features/Home";
import Navbar from "./features/Navbar";
import Users from "./features/Users";
import UserForm from "./features/UserForm/UserForm";
import RadarChart from "./features/RadarChart";
import Chart from "./features/Chart";
import Test from "./features/Test";
import { LayoutProvider } from './context/LayoutContext';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Horizontal from "./features/Horizontal";


function App() {
  return (
    <LayoutProvider>
      <HashRouter>
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
      </HashRouter>
    </LayoutProvider>
  );
}

export default App;
