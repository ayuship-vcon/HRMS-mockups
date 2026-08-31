import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Grid,
  Chip,
  Divider,
} from "@mui/material";

const DetailItem = ({ label, value }) => (
  <Box>
    <Typography
      variant="body2"
      sx={{
        color: "#64748B",
        fontSize: 12,
        mb: 0.5,
      }}
    >
      {label}
    </Typography>

    <Typography
      variant="body1"
      sx={{
        color: "#172554",
        fontSize: 14,
        fontWeight: 600,
      }}
    >
      {value || "-"}
    </Typography>
  </Box>
);

export default function BusinessTravelDetailsDialog({
  open,
  row,
  onClose,
}) {
  if (!row) return null;

  const statusColor =
    row.status === "Approved"
      ? "success"
      : row.status === "Pending"
      ? "warning"
      : "default";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          px: 3,
          py: 2,
          borderBottom: "1px solid #E5EAF1",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: 700,
                color: "#172554",
              }}
            >
              Business Travel Details
            </Typography>

            <Typography
              sx={{
                fontSize: 13,
                color: "#64748B",
                mt: 0.5,
              }}
            >
              {row.requestId}
            </Typography>
          </Box>

          <Chip
            label={row.status}
            color={statusColor}
            size="small"
            sx={{
              fontWeight: 600,
            }}
          />
        </Box>
      </DialogTitle>

      <DialogContent
        sx={{
          px: 3,
          py: 3,
        }}
      >
        {/* Request Information */}
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 700,
            color: "#172554",
            mb: 2,
          }}
        >
          Request Information
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <DetailItem
              label="Request ID"
              value={row.requestId}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <DetailItem
              label="Request Date"
              value={row.requestDate}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <DetailItem
              label="Request Time"
              value={row.requestTime}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Traveler Information */}
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 700,
            color: "#172554",
            mb: 2,
          }}
        >
          Traveler Information
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <DetailItem
              label="Employee Name"
              value={row.displayName}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <DetailItem
              label="Requested By"
              value={row.requestedBy}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <DetailItem
              label="Point of Contact"
              value={row.poc}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Travel Information */}
        <Typography
          sx={{
            fontSize: 15,
            fontWeight: 700,
            color: "#172554",
            mb: 2,
          }}
        >
          Travel Information
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <DetailItem
              label="Travel Type"
              value={row.travelType}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <DetailItem
              label="Travel Date"
              value={row.travelDate}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4 }}>
            <DetailItem
              label="Destination"
              value={row.destination}
            />
          </Grid>
        </Grid>

      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          borderTop: "1px solid #E5EAF1",
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

