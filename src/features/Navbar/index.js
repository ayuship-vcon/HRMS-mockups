import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import { useLayout } from "../../context/LayoutContext";

export default function Navbar() {
  const { toggleSidebar } = useLayout();

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "#fff",
        color: "#000",
      }}
    >
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" fontWeight="bold">
          HRMS Dashboard
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton>
          <NotificationsIcon />
        </IconButton>

        <IconButton>
          <SettingsIcon />
        </IconButton>

        <Avatar sx={{ ml: 2 }}>A</Avatar>
      </Toolbar>
    </AppBar>
  );
}