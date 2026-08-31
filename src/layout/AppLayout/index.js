import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import Navbar from '../Navbar';
import Sidebar from "../Sidebar";
import { useLayout } from "../../context/LayoutContext";

const drawerWidth = 250;
const collapsedDrawerWidth = 70;

export default function AppLayout() {
  const { sidebarOpen } = useLayout();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            xs: "100%",
            sm: `calc(100% - ${
              sidebarOpen ? drawerWidth : collapsedDrawerWidth
            }px)`,
          },
          ml: {
            xs: 0,
            sm: sidebarOpen
              ? `${drawerWidth}px`
              : `${collapsedDrawerWidth}px`,
          },
          transition: "margin-left 0.3s, width 0.3s",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Space for fixed Navbar */}
        <Toolbar />

        {/* Page Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: 1,
          }}
        >
          <Outlet />
        </Box>

      </Box>
    </Box>
  );
}