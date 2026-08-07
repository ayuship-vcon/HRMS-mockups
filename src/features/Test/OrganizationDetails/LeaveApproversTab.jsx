import React from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const LeaveApproversTab = ({ selected, activeTab }) => {
  const employees = [
    {
      id: "EMP001",
      name: "Sample Employee 1",
      designation: "Manager",
      primary: "Yes",
    },
    {
      id: "EMP002",
      name: "Sample Employee 2",
      designation: "Architect",
      primary: "No",
    },
    {
      id: "EMP003",
      name: "Sample Employee 3",
      designation: "Developer",
      primary: "No",
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2, gap: 15 }}
      >
        <Typography fontWeight={700}>Assigned {activeTab}</Typography>

        <Button variant="contained" startIcon={<PersonAddIcon />}>
          Add {activeTab}
        </Button>
      </Stack>

      <Box sx={{ overflowX: "auto" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Employee Code</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Designation</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id} hover>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.designation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default LeaveApproversTab;
