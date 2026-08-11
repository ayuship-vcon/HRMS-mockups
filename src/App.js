import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './features/Home';
import { useState } from 'react';
import Login from './features/Login';
import Navbar from './features/Navbar';
import Layout from './features/Layout';
import Users from './features/Users';
import UserForm from './features/UserForm/UserForm';
import RadarChart from './features/RadarChart';
import Chart from './features/Chart';
import Test from './features/Test';

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Test />}/>
          <Route path='/nav' element={<Navbar />}/>
          <Route path='/users' element={<Users />}/>
          <Route path='/userform' element={<UserForm />}/>
          <Route path='/radarchart' element={<RadarChart />}/>
          <Route path='/chart' element={<Chart />}/>
          <Route path='/test' element={<Test />}/>

        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
