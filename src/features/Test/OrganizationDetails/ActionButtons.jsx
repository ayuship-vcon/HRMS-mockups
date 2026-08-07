import React from "react";
import { Box, Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const ActionButtons = ({ onSave, onReset }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        gap: 1,
        mt: 3,
      }}
    >
      <Button
        variant="contained"
        startIcon={<SaveIcon />}
        onClick={onSave}
      >
        Save
      </Button>

      <Button
        variant="outlined"
        startIcon={<RestartAltIcon />}
        onClick={onReset}
      >
        Reset
      </Button>
    </Box>
  );
};

export default ActionButtons;