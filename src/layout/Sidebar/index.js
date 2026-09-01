import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";
import { useLayout } from "../../context/LayoutContext";

import { sidebarItems } from "./const";
import { usePermission } from "../../hooks/usePermission";

export const DRAWER_WIDTH = 250;
export const COLLAPSED_DRAWER_WIDTH = 70;

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { sidebarOpen } = useLayout();

const { can } = usePermission();

const filteredItems = sidebarItems.filter(
  (item) => !item.permission || can(item.permission)
);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarOpen
          ? DRAWER_WIDTH
          : COLLAPSED_DRAWER_WIDTH,

        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sidebarOpen
            ? DRAWER_WIDTH
            : COLLAPSED_DRAWER_WIDTH,

          transition: "width 0.3s",

          boxSizing: "border-box",

          bgcolor: "#1E293B",
          color: "#fff",
          borderRight: "none",

          overflowX: "hidden",
        },
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            width: "100%",
            textAlign: "center",
            display: sidebarOpen
              ? "block"
              : "none",
          }}
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
              <ListItemIcon
                sx={{
                  color: "#cbd5e1",
                  minWidth: 40,

                  justifyContent: sidebarOpen
                    ? "initial"
                    : "center",

                  mr: sidebarOpen
                    ? 2
                    : "auto",
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.label}
                sx={{
                  display: sidebarOpen
                    ? "block"
                    : "none",
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;