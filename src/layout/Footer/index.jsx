import React from "react";
import { Box, Typography, Link, Divider } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "#f8fafc",
        borderTop: "1px solid",
        borderColor: "divider",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {"Copyright © "}
        <Link color="inherit" href="#">
          HRMS Dashboard
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}
