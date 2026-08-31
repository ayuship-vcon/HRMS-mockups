import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonIcon from "@mui/icons-material/Person";
import BarChartIcon from "@mui/icons-material/BarChart";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

import { PERMISSIONS } from "../../constant";

export const sidebarItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: <DashboardIcon />,
    permission: PERMISSIONS.DASHBOARD_VIEW,
  },

  {
    label: "Users",
    path: "/users",
    icon: <PeopleIcon />,
    permission: PERMISSIONS.USER_VIEW,
  },

  {
    label: "Employee Profile",
    path: "/employee",
    icon: <PersonIcon />,
    permission: PERMISSIONS.EMPLOYEE_PROFILE_VIEW,
  },

  {
    label: "Reports",
    path: "/reports",
    icon: <AssessmentIcon />,
    permission: PERMISSIONS.REPORT_VIEW,
  },

  {
    label: "Chart",
    path: "/chart",
    icon: <BarChartIcon />,
    permission: PERMISSIONS.CHART_VIEW,
  },

  {
    label: "Radar Chart",
    path: "/radarchart",
    icon: <DonutLargeIcon />,
    permission: PERMISSIONS.RADAR_CHART_VIEW,
  },

  {
    label: "Horizontal",
    path: "/horizontal",
    icon: <ViewModuleIcon />,
    permission: PERMISSIONS.HORIZONTAL_VIEW,
  },

  {
    label: "Vertical",
    path: "/vertical",
    icon: <ViewModuleIcon />,
    permission: PERMISSIONS.VERTICAL_VIEW,
  },

  {
    label: "Apply Leave",
    path: "/apply-leave",
    icon: <ViewModuleIcon />,
    permission: PERMISSIONS.APPLY_LEAVE,
  },
  
];