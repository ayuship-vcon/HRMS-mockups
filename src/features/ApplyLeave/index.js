import React, { useMemo, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  ArrowBack,
  ArrowForward,
  AttachFile,
  CalendarMonth,
  Check,
  Close,
  CloudUploadOutlined,
  EditOutlined,
  EventAvailableOutlined,
  ExpandMore,
  GroupsOutlined,
  InfoOutlined,
  NotificationsNone,
  // PersonOutline,
  Refresh,
  RestartAlt,
  SendOutlined,
  WbSunnyOutlined,
  NightsStayOutlined,
} from "@mui/icons-material";

const LEAVE_CATEGORIES = [
  "Earned Leave",
  "Leave Without Pay",
  "Maternity Leave",
  "Paternity Leave",
  "Bereavement Leave",
  "Flexi Leave",
  "Working Remotely (WR)",
  "Working Remotely (Maternity)",
  "Working Remotely (Paternity)",
  "Casual Leave",
  "Working Remotely Exception",
  "Out Of Office",
  "Reaching a Milestone Leave",
  "Working Remotely (Self Wedding)",
];

const initialDays = [
  {
    date: "2024-05-12",
    label: "12 May 2024",
    day: "Sunday",
    mode: "full",
  },
  {
    date: "2024-05-13",
    label: "13 May 2024",
    day: "Monday",
    mode: "full",
  },
  {
    date: "2024-05-14",
    label: "14 May 2024",
    day: "Tuesday",
    mode: "firstHalf",
  },
  {
    date: "2024-05-15",
    label: "15 May 2024",
    day: "Wednesday",
    mode: "full",
  },
  {
    date: "2024-05-16",
    label: "16 May 2024",
    day: "Thursday",
    mode: "secondHalf",
  },
];

const approvers = [
  {
    id: 1,
    name: "Rohit Verma",
    role: "Team Lead · Design",
  },
  {
    id: 2,
    name: "Aarav Mehta",
    role: "Design Manager",
  },
];

const hrs = [
  {
    id: 1,
    name: "Neha Kapoor",
    role: "HR Manager",
  },
  {
    id: 2,
    name: "Priya Shah",
    role: "People Operations",
  },
];

const balanceItems = [
  { name: "Earned Leave", days: 12, color: "#f59e0b" },
  { name: "Casual Leave", days: 6, color: "#22c55e" },
  { name: "Flexi Leave", days: 4, color: "#6366f1" },
  { name: "Working Remotely (WR)", days: 8, color: "#0ea5e9" },
];

const pageBackground = "#f6f8fc";
const borderColor = "#e5eaf2";
const primary = "#2045e8";

function SectionHeader({ icon, title, subtitle }) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "9px",
          bgcolor: "#f0f3ff",
          color: primary,
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography
          sx={{
            fontSize: 17,
            fontWeight: 700,
            color: "#111827",
            lineHeight: 1.25,
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography sx={{ fontSize: 12.5, color: "#667085", mt: 0.3 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
    </Stack>
  );
}

function PersonRow({ person }) {
  return (
    <Stack
      direction="row"
      spacing={1.4}
      alignItems="center"
      sx={{
        p: 1.25,
        borderRadius: 2,
        border: `1px solid ${borderColor}`,
        bgcolor: "#fff",
      }}
    >
      <Avatar
        src={person.avatar}
        sx={{
          width: 42,
          height: 42,
          fontSize: 15,
          bgcolor: "#eef2ff",
          color: primary,
          fontWeight: 700,
        }}
      >
        {person.name
          .split(" ")
          .map((word) => word[0])
          .join("")
          .slice(0, 2)}
      </Avatar>

      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 700,
            color: "#172033",
          }}
        >
          {person.name}
        </Typography>
        <Typography sx={{ fontSize: 12, color: "#667085" }}>
          {person.role}
        </Typography>
      </Box>
    </Stack>
  );
}

function PeopleCard({ icon, title, subtitle, people }) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: `1px solid ${borderColor}`,
        borderRadius: 2.5,
        p: 2,
      }}
    >
      <SectionHeader icon={icon} title={title} subtitle={subtitle} />

      <Stack spacing={1.1} sx={{ mt: 2 }}>
        {people.map((person) => (
          <PersonRow key={person.id} person={person} />
        ))}
      </Stack>

      <Alert
        icon={<InfoOutlined sx={{ fontSize: 18 }} />}
        severity="info"
        sx={{
          mt: 1.5,
          py: 0.3,
          border: "1px solid #d8e2ff",
          bgcolor: "#f8faff",
          color: "#3150c8",
          "& .MuiAlert-message": {
            fontSize: 11.5,
          },
        }}
      >
        You will be notified once your request is reviewed.
      </Alert>
    </Paper>
  );
}

function LeaveBalanceCard() {
  return (
    <Paper
      elevation={0}
      sx={{
        border: `1px solid ${borderColor}`,
        borderRadius: 2.5,
        p: 2,
      }}
    >
      <SectionHeader
        icon={<CalendarMonth fontSize="small" />}
        title="Leave Balance"
        subtitle="As on 10 May 2024"
      />

      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Box
          sx={{
            flex: 1,
            p: 2,
            minHeight: 82,
            borderRadius: 2,
            background:
              "linear-gradient(135deg, rgba(34,197,94,.09), rgba(34,197,94,.04))",
          }}
        >
          <Typography sx={{ fontSize: 12, color: "#475467" }}>
            Total Leaves Earned
          </Typography>
          <Stack direction="row" spacing={0.6} alignItems="baseline" mt={0.5}>
            <Typography
              sx={{ fontSize: 28, fontWeight: 700, color: "#159447" }}
            >
              28
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#159447" }}>
              days
            </Typography>
          </Stack>
        </Box>

        <Box
          sx={{
            flex: 1,
            p: 2,
            minHeight: 82,
            borderRadius: 2,
            background:
              "linear-gradient(135deg, rgba(37,99,235,.08), rgba(37,99,235,.03))",
          }}
        >
          <Typography sx={{ fontSize: 12, color: "#475467" }}>
            Leaves Utilized
          </Typography>
          <Stack direction="row" spacing={0.6} alignItems="baseline" mt={0.5}>
            <Typography
              sx={{ fontSize: 28, fontWeight: 700, color: "#2045e8" }}
            >
              10
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#2045e8" }}>
              days
            </Typography>
          </Stack>
        </Box>
      </Stack>

      <Divider sx={{ my: 2.3 }} />

      <Typography sx={{ fontSize: 13, fontWeight: 700, mb: 1 }}>
        Leave Balance by Type
      </Typography>

      <Stack divider={<Divider flexItem />}>
        {balanceItems.map((item) => (
          <Stack
            key={item.name}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ py: 1.25 }}
          >
            <Stack direction="row" spacing={1.1} alignItems="center">
              <Box
                sx={{
                  width: 18,
                  height: 18,
                  borderRadius: "6px",
                  bgcolor: `${item.color}18`,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    bgcolor: item.color,
                  }}
                />
              </Box>

              <Typography sx={{ fontSize: 12.5, color: "#344054" }}>
                {item.name}
              </Typography>
            </Stack>

            <Typography sx={{ fontSize: 12.5, fontWeight: 600 }}>
              {item.days} days
            </Typography>
          </Stack>
        ))}
      </Stack>

      <Button
        endIcon={<ArrowForward />}
        size="small"
        sx={{
          display: "flex",
          mx: "auto",
          mt: 1.5,
          textTransform: "none",
          fontSize: 12,
        }}
      >
        View all leave types
      </Button>
    </Paper>
  );
}

function DayModeButton({ selected, color, icon, children, onClick }) {
  const styles = {
    green: {
      bg: "#edf9f1",
      border: "#bfe8cd",
      text: "#16803a",
    },
    orange: {
      bg: "#fff7ed",
      border: "#fed7aa",
      text: "#ea580c",
    },
    blue: {
      bg: "#eef2ff",
      border: "#c7d2fe",
      text: "#3045e5",
    },
  }[color];

  return (
    <Button
      size="small"
      startIcon={icon}
      onClick={onClick}
      sx={{
        minWidth: 112,
        height: 32,
        textTransform: "none",
        fontSize: 11.5,
        fontWeight: selected ? 700 : 500,
        border: "1px solid",
        borderColor: selected ? styles.border : "#dde3ec",
        bgcolor: selected ? styles.bg : "#fff",
        color: selected ? styles.text : "#475467",
        "&:hover": {
          bgcolor: selected ? styles.bg : "#f9fafb",
          borderColor: selected ? styles.border : "#cfd6e1",
        },
      }}
    >
      {children}
    </Button>
  );
}

function CustomizeLeaveDialog({ open, onClose }) {
  const [days, setDays] = useState(initialDays);

  const totals = useMemo(() => {
    const fullDays = days.filter((d) => d.mode === "full").length;
    const halfDays = days.length - fullDays;

    return {
      fullDays,
      halfDays,
      total: fullDays + halfDays * 0.5,
    };
  }, [days]);

  const updateMode = (date, mode) => {
    setDays((prev) =>
      prev.map((day) => (day.date === date ? { ...day, mode } : day))
    );
  };

  const resetDays = () => {
    setDays((prev) => prev.map((day) => ({ ...day, mode: "full" })));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: {
          maxWidth: 860,
          borderRadius: 2.5,
        },
      }}
    >
      <DialogTitle sx={{ p: 2.5, pb: 1.5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="start">
          <SectionHeader
            icon={<CalendarMonth />}
            title="Customize Leave Dates"
            subtitle="Choose how leave should be applied for each day"
          />

          <IconButton size="small" onClick={onClose}>
            <Close fontSize="small" />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ px: 2.5 }}>
        <Alert
          severity="info"
          icon={<InfoOutlined />}
          sx={{
            mb: 1.5,
            py: 0.25,
            border: "1px solid #cdd9ff",
            bgcolor: "#f7f9ff",
            "& .MuiAlert-message": {
              fontSize: 12,
              color: primary,
            },
          }}
        >
          You have selected 5 days (12 May 2024 – 16 May 2024)
        </Alert>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          spacing={1.5}
          sx={{ mb: 2 }}
        >
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip
              size="small"
              icon={<CalendarMonth />}
              label={`${totals.fullDays} Full Days`}
              sx={{
                bgcolor: "#edf9f1",
                color: "#16803a",
                border: "1px solid #c8ecd3",
              }}
            />

            <Chip
              size="small"
              icon={<WbSunnyOutlined />}
              label={`${totals.halfDays} Half Day${
                totals.halfDays === 1 ? "" : "s"
              }`}
              sx={{
                bgcolor: "#fff7ed",
                color: "#ea580c",
                border: "1px solid #fed7aa",
              }}
            />

            <Chip
              size="small"
              label={`Total: ${totals.total} Days`}
              sx={{
                bgcolor: "#eef2ff",
                color: primary,
              }}
            />
          </Stack>

          <Button
            size="small"
            startIcon={<Refresh />}
            onClick={resetDays}
            sx={{ textTransform: "none", fontSize: 11.5 }}
          >
            Reset to Full Days
          </Button>
        </Stack>

        <Box sx={{ overflowX: "auto" }}>
          <Box sx={{ minWidth: 730 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "130px 105px 1fr 1fr 1fr",
                gap: 1,
                px: 0.75,
                pb: 1,
              }}
            >
              {[
                "Date",
                "Day",
                "Full Day",
                "Half Day (First Half)",
                "Half Day (Second Half)",
              ].map((heading) => (
                <Typography
                  key={heading}
                  sx={{ fontSize: 11, fontWeight: 700, color: "#344054" }}
                >
                  {heading}
                </Typography>
              ))}
            </Box>

            {days.map((day) => (
              <Box
                key={day.date}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "130px 105px 1fr 1fr 1fr",
                  gap: 1,
                  alignItems: "center",
                  borderTop: `1px solid ${borderColor}`,
                  py: 1,
                  px: 0.75,
                }}
              >
                <Typography sx={{ fontSize: 11.5, fontWeight: 600 }}>
                  {day.label}
                </Typography>

                <Typography sx={{ fontSize: 11, color: "#667085" }}>
                  {day.day}
                </Typography>

                <DayModeButton
                  selected={day.mode === "full"}
                  color="green"
                  icon={<Check sx={{ fontSize: 15 }} />}
                  onClick={() => updateMode(day.date, "full")}
                >
                  Full Day
                </DayModeButton>

                <DayModeButton
                  selected={day.mode === "firstHalf"}
                  color="orange"
                  icon={<WbSunnyOutlined sx={{ fontSize: 15 }} />}
                  onClick={() => updateMode(day.date, "firstHalf")}
                >
                  First Half
                </DayModeButton>

                <DayModeButton
                  selected={day.mode === "secondHalf"}
                  color="blue"
                  icon={<NightsStayOutlined sx={{ fontSize: 15 }} />}
                  onClick={() => updateMode(day.date, "secondHalf")}
                >
                  Second Half
                </DayModeButton>
              </Box>
            ))}
          </Box>
        </Box>

        <Paper
          variant="outlined"
          sx={{
            mt: 2,
            p: 1.5,
            borderRadius: 2,
            bgcolor: "#fcfcfd",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <SummaryItem
              icon={<CalendarMonth />}
              value={totals.fullDays}
              label="Full Days"
              bg="#edf9f1"
              color="#169447"
            />

            <Typography color="text.secondary">+</Typography>

            <SummaryItem
              icon={<WbSunnyOutlined />}
              value={totals.halfDays}
              label="Half Day"
              bg="#fff7ed"
              color="#ea580c"
            />

            <Typography color="text.secondary">=</Typography>

            <SummaryItem
              icon={<EventAvailableOutlined />}
              value={totals.total}
              label="Total Days"
              bg="#eef2ff"
              color={primary}
            />
          </Stack>
        </Paper>
      </DialogContent>

      <DialogActions sx={{ px: 2.5, pb: 2.2, pt: 1.7 }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ textTransform: "none", color: "#344054" }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={onClose}
          disableElevation
          sx={{
            minWidth: 150,
            bgcolor: primary,
            textTransform: "none",
          }}
        >
          Apply Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function SummaryItem({ icon, value, label, bg, color }) {
  return (
    <Stack direction="row" spacing={1.2} alignItems="center">
      <Box
        sx={{
          width: 42,
          height: 42,
          borderRadius: 2,
          display: "grid",
          placeItems: "center",
          bgcolor: bg,
          color,
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography sx={{ fontSize: 18, fontWeight: 700 }}>
          {value}
        </Typography>
        <Typography sx={{ fontSize: 11, color: "#667085" }}>
          {label}
        </Typography>
      </Box>
    </Stack>
  );
}

export default function ApplyLeave() {
  const [leaveType, setLeaveType] = useState("Earned Leave");
  const [reason, setReason] = useState("");
  const [customizeOpen, setCustomizeOpen] = useState(false);

  const handleLeaveType = (event) => {
    setLeaveType(event.target.value);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: pageBackground,
        p: { xs: 1, md: 1.5 },
        color: "#172033",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          minHeight: "calc(100vh - 24px)",
          borderRadius: 3,
          border: `1px solid ${borderColor}`,
          overflow: "hidden",
          bgcolor: "#fbfcfe",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            height: 84,
            px: { xs: 2, md: 3 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: `1px solid ${borderColor}`,
            bgcolor: "rgba(255,255,255,.88)",
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton
              sx={{
                border: `1px solid ${borderColor}`,
                borderRadius: 2,
                width: 44,
                height: 44,
              }}
            >
              <ArrowBack />
            </IconButton>

            <Box>
              <Typography
                sx={{ fontSize: 20, lineHeight: 1.2, fontWeight: 700 }}
              >
                Apply for Leave
              </Typography>
              <Typography sx={{ mt: 0.5, color: "#667085", fontSize: 13 }}>
                Submit your leave request
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={2.5} alignItems="center">
            <Box sx={{ position: "relative" }}>
              <IconButton>
                <NotificationsNone />
              </IconButton>
              <Box
                sx={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  minWidth: 18,
                  height: 18,
                  px: 0.5,
                  borderRadius: 9,
                  bgcolor: "#ef233c",
                  color: "#fff",
                  fontSize: 10,
                  fontWeight: 700,
                  display: "grid",
                  placeItems: "center",
                  border: "2px solid white",
                }}
              >
                3
              </Box>
            </Box>

            <Stack
              direction="row"
              spacing={1.2}
              alignItems="center"
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              <Avatar
                sx={{
                  width: 42,
                  height: 42,
                  bgcolor: "#f1d0bd",
                  color: "#8a4f36",
                }}
              >
                AS
              </Avatar>

              <Box>
                <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                  Ananya Sharma
                </Typography>
                <Typography sx={{ fontSize: 11.5, color: "#667085" }}>
                  Product Designer
                </Typography>
              </Box>

              <ExpandMore fontSize="small" />
            </Stack>
          </Stack>
        </Box>

        {/* Main */}
        <Box
          sx={{
            p: { xs: 1.5, md: 2 },
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: "minmax(0, 2.15fr) minmax(340px, .95fr)",
            },
            gap: 2,
            alignItems: "start",
          }}
        >
          {/* LEFT */}
          <Paper
            component="form"
            elevation={0}
            sx={{
              p: { xs: 2, md: 2.5 },
              border: `1px solid ${borderColor}`,
              borderRadius: 2.5,
              minWidth: 0,
            }}
          >
            <SectionHeader
              icon={<EventAvailableOutlined />}
              title="Leave Information"
              subtitle="Fill in the details to apply for leave"
            />

            <Box sx={{ mt: 2.5 }}>
              <Typography sx={fieldLabelSx}>
                Leave Type <Required />
              </Typography>

              <FormControl fullWidth size="small">
                <Select
                  value={leaveType}
                  onChange={handleLeaveType}
                  sx={inputSx}
                  renderValue={(value) => (
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box
                        sx={{
                          width: 25,
                          height: 25,
                          borderRadius: 1.5,
                          bgcolor: "#edfbf2",
                          color: "#16a34a",
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        <EventAvailableOutlined sx={{ fontSize: 17 }} />
                      </Box>
                      <Typography sx={{ fontSize: 13 }}>{value}</Typography>
                    </Stack>
                  )}
                >
                  {LEAVE_CATEGORIES.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "1fr 1fr auto",
                },
                gap: 2,
                mt: 2.5,
                alignItems: "end",
              }}
            >
              <Box>
                <Typography sx={fieldLabelSx}>
                  Start Date <Required />
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  defaultValue="2024-05-12"
                  sx={textFieldSx}
                />
              </Box>

              <Box>
                <Typography sx={fieldLabelSx}>
                  End Date <Required />
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="date"
                  defaultValue="2024-05-16"
                  sx={textFieldSx}
                />
              </Box>

              <Button
                variant="outlined"
                startIcon={<EventAvailableOutlined />}
                sx={{
                  height: 41,
                  px: 2.5,
                  whiteSpace: "nowrap",
                  textTransform: "none",
                  borderColor: "#cfd7e6",
                }}
              >
                Forecasted Leave Balance
              </Button>
            </Box>

            <Paper
              variant="outlined"
              sx={{
                mt: 2,
                px: 2,
                py: 1.4,
                borderColor: "#cfd9ff",
                bgcolor: "#f8faff",
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                alignItems: "center",
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <CalendarMonth sx={{ color: primary }} />

                <Box>
                  <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                    5 days selected
                  </Typography>
                  <Typography sx={{ fontSize: 11.5, color: "#667085" }}>
                    Includes 4 Full Days, 1 Half Day
                  </Typography>
                </Box>
              </Stack>

              <Button
                size="small"
                endIcon={<EditOutlined />}
                onClick={() => setCustomizeOpen(true)}
                sx={{ textTransform: "none", whiteSpace: "nowrap" }}
              >
                Customize dates
              </Button>
            </Paper>

            <Box sx={{ mt: 2.5 }}>
              <Typography sx={fieldLabelSx}>
                Reason for Leave <Required />
              </Typography>

              <Box sx={{ position: "relative" }}>
                <TextField
                  multiline
                  minRows={4}
                  fullWidth
                  placeholder="Please provide the reason for your leave..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value.slice(0, 500))}
                  sx={textFieldSx}
                />
                <Typography
                  sx={{
                    position: "absolute",
                    bottom: 9,
                    right: 10,
                    fontSize: 10,
                    color: "#98a2b3",
                  }}
                >
                  {reason.length}/500
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 2.5, maxWidth: 440 }}>
              <Typography sx={fieldLabelSx}>CC (Optional)</Typography>

              <FormControl fullWidth size="small">
                <InputLabel>Select people to CC</InputLabel>
                <Select
                  label="Select people to CC"
                  defaultValue=""
                  sx={inputSx}
                >
                  <MenuItem value="aarav">Aarav Mehta</MenuItem>
                  <MenuItem value="priya">Priya Shah</MenuItem>
                  <MenuItem value="neha">Neha Kapoor</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mt: 2.5, maxWidth: 440 }}>
              <Typography sx={fieldLabelSx}>Attachment (Optional)</Typography>
              <Typography sx={{ fontSize: 11.5, color: "#7b8496", mb: 1 }}>
                Upload any supporting documents
              </Typography>

              <Box
                component="label"
                sx={{
                  height: 104,
                  border: "1px dashed #ccd5e3",
                  borderRadius: 2,
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                  bgcolor: "#fff",
                  transition: ".15s",
                  "&:hover": {
                    borderColor: "#8da4f8",
                    bgcolor: "#fafbff",
                  },
                }}
              >
                <input type="file" hidden />

                <Stack alignItems="center" spacing={0.5}>
                  <CloudUploadOutlined sx={{ color: "#667085" }} />
                  <Typography sx={{ fontSize: 12, color: "#475467" }}>
                    Click to upload or drag and drop
                  </Typography>
                  <Typography sx={{ fontSize: 10.5, color: "#98a2b3" }}>
                    PDF, JPG, PNG up to 5MB
                  </Typography>
                </Stack>
              </Box>
            </Box>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1.5}
              sx={{
                mt: 5,
                pt: 2,
                borderTop: `1px solid ${borderColor}`,
              }}
            >
              <Button
                variant="outlined"
                startIcon={<RestartAlt />}
                sx={{
                  minWidth: 190,
                  height: 44,
                  textTransform: "none",
                  color: "#344054",
                  borderColor: "#d6dde8",
                }}
              >
                Clear / Reset
              </Button>

              <Button
                variant="contained"
                startIcon={<SendOutlined />}
                disableElevation
                sx={{
                  flex: 1,
                  height: 44,
                  textTransform: "none",
                  fontWeight: 600,
                  bgcolor: primary,
                  "&:hover": {
                    bgcolor: "#1938ca",
                  },
                }}
              >
                Submit Leave Request
              </Button>
            </Stack>
          </Paper>

          {/* RIGHT */}
          <Stack spacing={1.5}>
            <LeaveBalanceCard />

            <PeopleCard
              icon={<GroupsOutlined />}
              title="Approvers"
              subtitle="Your leave request will be sent to"
              people={approvers}
            />

            <PeopleCard
              icon={<GroupsOutlined />}
              title="HRs"
              subtitle="Your request will also be visible to"
              people={hrs}
            />
          </Stack>
        </Box>
      </Paper>

      <CustomizeLeaveDialog
        open={customizeOpen}
        onClose={() => setCustomizeOpen(false)}
      />
    </Box>
  );
}

function Required() {
  return (
    <Box component="span" sx={{ color: "#ef4444" }}>
      *
    </Box>
  );
}

const fieldLabelSx = {
  mb: 0.8,
  fontSize: 12,
  fontWeight: 600,
  color: "#344054",
};

const inputSx = {
  bgcolor: "#fff",
  borderRadius: 1.5,
  fontSize: 13,
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#d8dee9",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#aab5c4",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: primary,
    borderWidth: 1.5,
  },
};

const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "#fff",
    borderRadius: 1.5,
    fontSize: 13,
    "& fieldset": {
      borderColor: "#d8dee9",
    },
    "&:hover fieldset": {
      borderColor: "#aab5c4",
    },
    "&.Mui-focused fieldset": {
      borderColor: primary,
      borderWidth: 1.5,
    },
  },
};
