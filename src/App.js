import "./App.css";

import { HashRouter, Routes, Route } from "react-router-dom";

import { LayoutProvider } from "./context/LayoutContext";

import AppLayout from "./layout/AppLayout";
import PermissionRoute from "./components/PermissionRoute";
import AccessDenied from "./components/AccessDenied";

import Home from "./features/Home";
import Users from "./features/Users";
import UserForm from "./features/UserForm/UserForm";
import RadarChart from "./features/RadarChart";
import Chart from "./features/Chart";
import Test from "./features/Test";
import Horizontal from "./features/Horizontal";
import BusinessTravelReport from "./features/BusinessTravelReport";
import Login from "./features/Login";
import EmployeProfile from "./features/EmployeProfile";

function App() {
  return (
    <LayoutProvider>
      <HashRouter>
        <Routes>

          {/* ======================
              PUBLIC
          ======================= */}

          <Route
            path="/login"
            element={<Login />}
          />


          {/* ======================
              APPLICATION
          ======================= */}

          <Route element={<AppLayout />}>

            <Route
              path="/"
              element={
                <PermissionRoute
                  permission="dashboard.view"
                >
                  <Home />
                </PermissionRoute>
              }
            />

            <Route
              path="/users"
              element={
                <PermissionRoute
                  permission="user.view"
                >
                  <Users />
                </PermissionRoute>
              }
            />

            <Route
              path="/userform"
              element={
                <PermissionRoute
                  permission="user.create"
                >
                  <UserForm />
                </PermissionRoute>
              }
            />

            <Route
              path="/employee"
              element={
                <PermissionRoute
                  permission="employee.profile.view"
                >
                  <EmployeProfile />
                </PermissionRoute>
              }
            />

            <Route
              path="/reports"
              element={
                <PermissionRoute
                  permission="report.view"
                >
                  <BusinessTravelReport />
                </PermissionRoute>
              }
            />

            <Route
              path="/chart"
              element={
                <PermissionRoute
                  permission="chart.view"
                >
                  <Chart />
                </PermissionRoute>
              }
            />

            <Route
              path="/radarchart"
              element={
                <PermissionRoute
                  permission="radar-chart.view"
                >
                  <RadarChart />
                </PermissionRoute>
              }
            />

            <Route
              path="/horizontal"
              element={
                <PermissionRoute
                  permission="horizontal.view"
                >
                  <Horizontal />
                </PermissionRoute>
              }
            />

            <Route
              path="/vertical"
              element={
                <PermissionRoute
                  permission="vertical.view"
                >
                  <Test />
                </PermissionRoute>
              }
            />

            {/* Access Denied */}
            <Route
              path="/access-denied"
              element={<AccessDenied />}
            />

          </Route>

        </Routes>
      </HashRouter>
    </LayoutProvider>
  );
}

export default App;