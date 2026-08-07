import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";

export default function Navbar() {
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