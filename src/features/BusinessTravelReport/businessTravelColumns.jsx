import {
  Box,
  Chip,
  Typography,
} from "@mui/material";

import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

export const businessTravelColumns = [
  {
    field: "requestId",
    headerName: "Request ID",
    width: 170,
    sticky: true,

    filter: {
      type: "text",
      operators: [
        "contains",
        "equals",
        "startsWith",
        "endsWith",
      ],
    },

    renderCell: ({ value }) => (
      <Typography
        sx={{
          fontSize: 14,
          fontWeight: 700,
          color: "#0563D9",
        }}
      >
        {value}
      </Typography>
    ),
  },

  {
    field: "requestDate",
    headerName: "Request Date",
    width: 190,
    sticky: true,

    filter: {
      type: "date",
      operators: [
        "equals",
        "before",
        "after",
        "onOrBefore",
        "onOrAfter",
      ],
    },

    valueGetter: (row) =>
      `${row.requestDate ?? ""} ${row.requestTime ?? ""}`,

    renderCell: ({ row }) => (
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 14 }}>
            {row.requestDate}
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              color: "#64748B",
            }}
          >
            {row.requestTime}
          </Typography>
        </Box>
      </Box>
    ),
  },

  {
    field: "displayName",
    headerName: "Display Name",
    width: 220,

    sticky: true,

    filter: {
      type: "text",
      operators: [
        "contains",
        "equals",
        "startsWith",
        "endsWith",
      ],
    },
  },

  {
    field: "travelType",
    headerName: "Type of Travel",
    width: 190,

    filter: {
      type: "select",
      operators: [
        "equals",
        "notEquals",
      ],

      options: [
        {
          label: "International",
          value: "International",
        },
        {
          label: "Domestic",
          value: "Domestic",
        },
      ],
    },

    renderCell: ({ value }) => {
      const international =
        value === "International";

      return (
        <Chip
          size="small"
          label={value}
          icon={
            international ? (
              <PublicRoundedIcon />
            ) : (
              <LocationOnOutlinedIcon />
            )
          }
          sx={{
            bgcolor: international
              ? "#EAF3FF"
              : "#EAF8EE",

            color: international
              ? "#0563D9"
              : "#16803A",

            "& .MuiChip-icon": {
              color: international
                ? "#0563D9"
                : "#16803A",
            },
          }}
        />
      );
    },
  },

  {
    field: "travelDate",
    headerName: "Date of Travel",
    width: 190,

    filter: {
      type: "date",
      operators: [
        "equals",
        "before",
        "after",
        "onOrBefore",
        "onOrAfter",
      ],
    },
  },

  {
    field: "poc",
    headerName: "POC",
    width: 190,

    filter: {
      type: "text",
      operators: [
        "contains",
        "equals",
        "startsWith",
        "endsWith",
      ],
    },
  },

  {
    field: "requestedBy",
    headerName: "Requested By",
    width: 240,

    filter: {
      type: "text",
      operators: [
        "contains",
        "equals",
        "startsWith",
        "endsWith",
      ],
    },
  },

  {
    field: "status",
    headerName: "Status",
    width: 150,

    filter: {
      type: "select",
      operators: [
        "equals",
        "notEquals",
      ],

      options: [
        {
          label: "Pending",
          value: "Pending",
        },
        {
          label: "Approved",
          value: "Approved",
        },
        {
          label: "Rejected",
          value: "Rejected",
        },
      ],
    },
  },

  {
    field: "project",
    headerName: "Project",
    width: 180,
    editable: true,
    sortable: true,

    filter: {
      type: "text",
      operators: [
        "contains",
        "equals",
        "startsWith",
        "endsWith",
      ],
    },
  },

  {
    field: "destination",
    headerName: "Destination",
    width: 180,

    filter: {
      type: "text",
      operators: [
        "contains",
        "equals",
        "startsWith",
        "endsWith",
      ],
    },
  },
];