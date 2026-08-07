import { useSelector } from "react-redux";
import { Drawer, Toolbar, List, ListItemButton, ListItemIcon, ListItemText, Typography, Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 250;

const sidebarItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
    roles: ["admin", "user", "manager"],
  },
  {
    label: "Users",
    path: "/users",
    icon: <PeopleIcon />,
    roles: ["user"],
  },
  {
    label: "Reports",
    path: "/reports",
    icon: <AssessmentIcon />,
    roles: ["admin", "user"],
  },
  {
    label: "Profile",
    path: "/profile",
    icon: <PersonIcon />,
    roles: ["admin", "user", "manager"],
  },
];

function Sidebar() {
  const role = useSelector((state) => state.user.role);
  const navigate = useNavigate();
  const location = useLocation();

  const filteredItems = sidebarItems.filter((item) =>
    item.roles.includes(role)
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "#1E293B",
          color: "#fff",
          borderRight: "none",
        },
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ width: "100%", textAlign: "center" }}
        >
          Admin Panel
        </Typography>
      </Toolbar>

      <Box sx={{ px: 1 }}>
        <List>
          {filteredItems.map((item) => (
            <ListItemButton
              key={item.path}
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              sx={{
                borderRadius: 2,
                mb: 1,
                "&.Mui-selected": {
                  bgcolor: "#1976d2",
                  color: "#fff",
                  "& .MuiListItemIcon-root": {
                    color: "#fff",
                  },
                },
                "&:hover": {
                  bgcolor: "#334155",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#cbd5e1", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>

              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;