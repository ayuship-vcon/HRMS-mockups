import React, { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

const COMPANY_NAME = "vConstruct";

const INITIAL_ROWS = [
  {
    id: 1,
    level: "BU",
    companyName: COMPANY_NAME,
    buName: "Engineering",
    clusterName: "",
    subClusterName: "",
    teamName: "",
  },
  {
    id: 2,
    level: "BU",
    companyName: COMPANY_NAME,
    buName: "Operations",
    clusterName: "",
    subClusterName: "",
    teamName: "",
  },
  {
    id: 3,
    level: "Cluster",
    companyName: COMPANY_NAME,
    buName: "Engineering",
    clusterName: "Digital Delivery",
    subClusterName: "",
    teamName: "",
  },
  {
    id: 4,
    level: "SubCluster",
    companyName: COMPANY_NAME,
    buName: "Engineering",
    clusterName: "Digital Delivery",
    subClusterName: "Frontend",
    teamName: "",
  },
  {
    id: 5,
    level: "Team",
    companyName: COMPANY_NAME,
    buName: "Engineering",
    clusterName: "Digital Delivery",
    subClusterName: "Frontend",
    teamName: "React Team",
  },
];

const EMPTY_FORM = {
  level: "",
  name: "",
  parentLevel: "",
  parentValue: "",
};

function getUniqueValues(values) {
  return [...new Set(values.filter(Boolean))];
}

function OrganizationDialog({
  open,
  mode,
  form,
  error,
  parentOptions,
  onChange,
  onClose,
  onSubmit,
}) {
  const isEdit = mode === "edit";
  const isBU = form.level === "BU";
  const isCluster = form.level === "Cluster";
  const isSubCluster = form.level === "SubCluster";
  const isTeam = form.level === "Team";

  const nameLabel = form.level
    ? `${form.level} Name`
    : "Organization Name";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <Box component="form" onSubmit={onSubmit}>
        <DialogTitle sx={{ fontWeight: 800 }}>
          {isEdit ? "Edit Organization" : "Add Organization"}
        </DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              fullWidth
              label="Company Name"
              value={COMPANY_NAME}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />

            <FormControl fullWidth required>
              <InputLabel>Business Level</InputLabel>

              <Select
                value={form.level}
                label="Business Level"
                disabled={isEdit}
                onChange={(event) =>
                  onChange({
                    level: event.target.value,
                    name: "",
                    parentLevel: "",
                    parentValue: "",
                  })
                }
              >
                <MenuItem value="">
                  <em>Select business level</em>
                </MenuItem>

                <MenuItem value="BU">BU</MenuItem>
                <MenuItem value="Cluster">Cluster</MenuItem>
                <MenuItem value="SubCluster">
                  SubCluster
                </MenuItem>
                <MenuItem value="Team">Team</MenuItem>
              </Select>
            </FormControl>

            {form.level && (
              <TextField
                fullWidth
                required
                label={nameLabel}
                value={form.name}
                onChange={(event) =>
                  onChange({
                    name: event.target.value,
                  })
                }
              />
            )}

            {isBU && (
              <Typography
                variant="body2"
                color="text.secondary"
              >
                The BU will be added directly under{" "}
                {COMPANY_NAME}. No parent selection is required.
              </Typography>
            )}

            {isCluster && (
              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
              >
                <TextField
                  fullWidth
                  label="Parent Level"
                  value="BU"
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />

                <FormControl fullWidth required>
                  <InputLabel>Select BU</InputLabel>

                  <Select
                    value={form.parentValue}
                    label="Select BU"
                    onChange={(event) =>
                      onChange({
                        parentLevel: "BU",
                        parentValue: event.target.value,
                      })
                    }
                  >
                    {parentOptions.map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            )}

            {isSubCluster && (
              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
              >
                <TextField
                  fullWidth
                  label="Parent Level"
                  value="Cluster"
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />

                <FormControl fullWidth required>
                  <InputLabel>Select Cluster</InputLabel>

                  <Select
                    value={form.parentValue}
                    label="Select Cluster"
                    onChange={(event) =>
                      onChange({
                        parentLevel: "Cluster",
                        parentValue: event.target.value,
                      })
                    }
                  >
                    {parentOptions.map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            )}

            {isTeam && (
              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                spacing={2}
              >
                <FormControl fullWidth required>
                  <InputLabel>Parent Level</InputLabel>

                  <Select
                    value={form.parentLevel}
                    label="Parent Level"
                    onChange={(event) =>
                      onChange({
                        parentLevel: event.target.value,
                        parentValue: "",
                      })
                    }
                  >
                    <MenuItem value="BU">BU</MenuItem>
                    <MenuItem value="Cluster">
                      Cluster
                    </MenuItem>
                    <MenuItem value="SubCluster">
                      SubCluster
                    </MenuItem>
                  </Select>
                </FormControl>

                <FormControl
                  fullWidth
                  required
                  disabled={!form.parentLevel}
                >
                  <InputLabel>
                    {form.parentLevel
                      ? `Select ${form.parentLevel}`
                      : "Select Parent"}
                  </InputLabel>

                  <Select
                    value={form.parentValue}
                    label={
                      form.parentLevel
                        ? `Select ${form.parentLevel}`
                        : "Select Parent"
                    }
                    onChange={(event) =>
                      onChange({
                        parentValue: event.target.value,
                      })
                    }
                  >
                    {parentOptions.map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            )}
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            type="button"
            color="inherit"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button type="submit" variant="contained">
            {isEdit ? "Save Changes" : "Add"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default function Loader() {
  const [rows, setRows] = useState(INITIAL_ROWS);

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [mode, setMode] = useState("add");

  const [editingId, setEditingId] =
    useState(null);

  const [form, setForm] = useState(EMPTY_FORM);

  const [error, setError] = useState("");

  const buOptions = useMemo(() => {
    return getUniqueValues(
      rows.map((row) => row.buName)
    ).map((buName) => ({
      value: buName,
      label: buName,
      buName,
      clusterName: "",
      subClusterName: "",
    }));
  }, [rows]);

  const clusterOptions = useMemo(() => {
    const clusterMap = new Map();

    rows.forEach((row) => {
      if (!row.clusterName) {
        return;
      }

      const key = `${row.buName}||${row.clusterName}`;

      clusterMap.set(key, {
        value: key,
        label: `${row.clusterName} - ${row.buName}`,
        buName: row.buName,
        clusterName: row.clusterName,
        subClusterName: "",
      });
    });

    return [...clusterMap.values()];
  }, [rows]);

  const subClusterOptions = useMemo(() => {
    const subClusterMap = new Map();

    rows.forEach((row) => {
      if (!row.subClusterName) {
        return;
      }

      const key = `${row.buName}||${row.clusterName}||${row.subClusterName}`;

      subClusterMap.set(key, {
        value: key,
        label: `${row.subClusterName} - ${row.clusterName}`,
        buName: row.buName,
        clusterName: row.clusterName,
        subClusterName: row.subClusterName,
      });
    });

    return [...subClusterMap.values()];
  }, [rows]);

  const parentOptions = useMemo(() => {
    if (form.level === "Cluster") {
      return buOptions;
    }

    if (form.level === "SubCluster") {
      return clusterOptions;
    }

    if (
      form.level === "Team" &&
      form.parentLevel === "BU"
    ) {
      return buOptions;
    }

    if (
      form.level === "Team" &&
      form.parentLevel === "Cluster"
    ) {
      return clusterOptions;
    }

    if (
      form.level === "Team" &&
      form.parentLevel === "SubCluster"
    ) {
      return subClusterOptions;
    }

    return [];
  }, [
    form.level,
    form.parentLevel,
    buOptions,
    clusterOptions,
    subClusterOptions,
  ]);

  const updateForm = (updatedValues) => {
    setForm((currentForm) => ({
      ...currentForm,
      ...updatedValues,
    }));

    setError("");
  };

  const openAddDialog = () => {
    setMode("add");
    setEditingId(null);
    setForm(EMPTY_FORM);
    setError("");
    setDialogOpen(true);
  };

  const openEditDialog = (row) => {
    let parentLevel = "";
    let parentValue = "";

    if (row.level === "Cluster") {
      parentLevel = "BU";
      parentValue = row.buName;
    }

    if (row.level === "SubCluster") {
      parentLevel = "Cluster";
      parentValue = `${row.buName}||${row.clusterName}`;
    }

    if (row.level === "Team") {
      if (row.subClusterName) {
        parentLevel = "SubCluster";
        parentValue = `${row.buName}||${row.clusterName}||${row.subClusterName}`;
      } else if (row.clusterName) {
        parentLevel = "Cluster";
        parentValue = `${row.buName}||${row.clusterName}`;
      } else {
        parentLevel = "BU";
        parentValue = row.buName;
      }
    }

    let organizationName = "";

    if (row.level === "BU") {
      organizationName = row.buName;
    }

    if (row.level === "Cluster") {
      organizationName = row.clusterName;
    }

    if (row.level === "SubCluster") {
      organizationName = row.subClusterName;
    }

    if (row.level === "Team") {
      organizationName = row.teamName;
    }

    setMode("edit");
    setEditingId(row.id);

    setForm({
      level: row.level,
      name: organizationName,
      parentLevel,
      parentValue,
    });

    setError("");
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setForm(EMPTY_FORM);
    setEditingId(null);
    setError("");
  };

  const findSelectedParent = () => {
    return parentOptions.find(
      (option) =>
        option.value === form.parentValue
    );
  };

  const buildRow = (id) => {
    const organizationName = form.name.trim();
    const parent = findSelectedParent();

    if (form.level === "BU") {
      return {
        id,
        level: "BU",
        companyName: COMPANY_NAME,
        buName: organizationName,
        clusterName: "",
        subClusterName: "",
        teamName: "",
      };
    }

    if (form.level === "Cluster") {
      return {
        id,
        level: "Cluster",
        companyName: COMPANY_NAME,
        buName: parent.buName,
        clusterName: organizationName,
        subClusterName: "",
        teamName: "",
      };
    }

    if (form.level === "SubCluster") {
      return {
        id,
        level: "SubCluster",
        companyName: COMPANY_NAME,
        buName: parent.buName,
        clusterName: parent.clusterName,
        subClusterName: organizationName,
        teamName: "",
      };
    }

    return {
      id,
      level: "Team",
      companyName: COMPANY_NAME,
      buName: parent.buName,
      clusterName: parent.clusterName || "",
      subClusterName:
        parent.subClusterName || "",
      teamName: organizationName,
    };
  };

  const validateForm = () => {
    if (!form.level) {
      return "Please select a business level.";
    }

    if (!form.name.trim()) {
      return `Please enter the ${form.level} name.`;
    }

    if (
      form.level !== "BU" &&
      !form.parentValue
    ) {
      return "Please select a parent organization.";
    }

    const normalizedName = form.name
      .trim()
      .toLowerCase();

    const selectedParent = findSelectedParent();

    const duplicateExists = rows.some((row) => {
      if (row.id === editingId) {
        return false;
      }

      if (form.level === "BU") {
        return (
          row.level === "BU" &&
          row.buName.toLowerCase() ===
            normalizedName
        );
      }

      if (!selectedParent) {
        return false;
      }

      if (form.level === "Cluster") {
        return (
          row.buName ===
            selectedParent.buName &&
          row.clusterName.toLowerCase() ===
            normalizedName
        );
      }

      if (form.level === "SubCluster") {
        return (
          row.buName ===
            selectedParent.buName &&
          row.clusterName ===
            selectedParent.clusterName &&
          row.subClusterName.toLowerCase() ===
            normalizedName
        );
      }

      return (
        row.buName === selectedParent.buName &&
        row.clusterName ===
          (selectedParent.clusterName || "") &&
        row.subClusterName ===
          (selectedParent.subClusterName || "") &&
        row.teamName.toLowerCase() ===
          normalizedName
      );
    });

    if (duplicateExists) {
      return `This ${form.level} already exists under the selected parent.`;
    }

    return "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    if (mode === "edit") {
      setRows((currentRows) =>
        currentRows.map((row) =>
          row.id === editingId
            ? buildRow(row.id)
            : row
        )
      );
    } else {
      const nextId =
        rows.length > 0
          ? Math.max(
              ...rows.map((row) => row.id)
            ) + 1
          : 1;

      setRows((currentRows) => [
        ...currentRows,
        buildRow(nextId),
      ]);
    }

    closeDialog();
  };

  const handleDelete = (id) => {
    setRows((currentRows) =>
      currentRows.filter(
        (row) => row.id !== id
      )
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Card
          elevation={0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <CardContent
            sx={{
              p: {
                xs: 2,
                md: 3,
              },
            }}
          >
            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              justifyContent="space-between"
              alignItems={{
                xs: "stretch",
                sm: "center",
              }}
              spacing={2}
              sx={{ mb: 3 }}
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight={800}
                >
                  Organization Management
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  View, add, edit, and delete BU,
                  Cluster, SubCluster, and Team
                  records.
                </Typography>
              </Box>

              <Button
                variant="contained"
                onClick={openAddDialog}
              >
                Add Organization
              </Button>
            </Stack>

            <TableContainer
              component={Paper}
              variant="outlined"
              sx={{
                borderRadius: 2,
                overflowX: "auto",
              }}
            >
              <Table sx={{ minWidth: 900 }}>
                <TableHead>
                  <TableRow
                    sx={{
                      bgcolor: "#f8fafc",
                    }}
                  >
                    <TableCell sx={{ fontWeight: 700 }}>
                      Company Name
                    </TableCell>

                    <TableCell sx={{ fontWeight: 700 }}>
                      BU Name
                    </TableCell>

                    <TableCell sx={{ fontWeight: 700 }}>
                      Cluster Name
                    </TableCell>

                    <TableCell sx={{ fontWeight: 700 }}>
                      SubCluster Name
                    </TableCell>

                    <TableCell sx={{ fontWeight: 700 }}>
                      Team Name
                    </TableCell>

                    <TableCell
                      align="right"
                      sx={{ fontWeight: 700 }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        align="center"
                        sx={{ py: 6 }}
                      >
                        <Typography color="text.secondary">
                          No organization records found.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    rows.map((row) => (
                      <TableRow
                        key={row.id}
                        hover
                      >
                        <TableCell>
                          {row.companyName}
                        </TableCell>

                        <TableCell>
                          {row.buName || "—"}
                        </TableCell>

                        <TableCell>
                          {row.clusterName || "—"}
                        </TableCell>

                        <TableCell>
                          {row.subClusterName || "—"}
                        </TableCell>

                        <TableCell>
                          {row.teamName || "—"}
                        </TableCell>

                        <TableCell align="right">
                          <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="flex-end"
                          >
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() =>
                                openEditDialog(row)
                              }
                            >
                              Edit
                            </Button>

                            <Button
                              size="small"
                              color="error"
                              onClick={() =>
                                handleDelete(row.id)
                              }
                            >
                              Delete
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Container>

      <OrganizationDialog
        open={dialogOpen}
        mode={mode}
        form={form}
        error={error}
        parentOptions={parentOptions}
        onChange={updateForm}
        onClose={closeDialog}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}