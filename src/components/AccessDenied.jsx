import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AccessDenied() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        Access Denied
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mt: 1, mb: 3 }}
      >
        You don't have permission to access this page.
      </Typography>

      <Button
        variant="contained"
        onClick={() => navigate("/")}
      >
        Go to Dashboard
      </Button>
    </Box>
  );
}