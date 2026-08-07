import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import { RadarChart } from "@mui/x-charts/RadarChart";

const metrics = [
  "High Quality Work",
  "Communication",
  "Planning",
  "Team Work",
  "Professional Conduct",
  "Core Values",
  "Management",
  "Work Culture",
  "Problem Solving",
  "Connecting Dots",
  "Everforward Spirit",
];
const answeredQuestions = [
  "Communication",
  "Planning",
  "Core Values",
];
const allSeries = [
  {
    label: "Core",
    fillArea: true,
    color: "#5B9BFF",
  data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  },
  {
    label: "Overlapping",
    color: "#D97706",
    fillArea: true,
    data: [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
  },
  {
    label: "Self Rating",
    color: "#2E7D32",
    fillArea: true,
    data: [3, 3.2, 2.8, 3.5, 3.8, 0, 0, 0, 0, 0, 2.5],
  },
];

export default function PerformanceRadar() {
  const [hidden, setHidden] = React.useState([]);

  const toggleSeries = (label) => {
    setHidden((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label],
    );
  };
  const chartRef = React.useRef(null);

React.useEffect(() => {
  if (!chartRef.current) return;

  const updateLabels = () => {
    const labels = chartRef.current.querySelectorAll("svg text");

    labels.forEach((label) => {
      const value = label.textContent?.trim();

      if (!metrics.includes(value)) return;

      const color = answeredQuestions.includes(value)
        ? "#2E7D32"
        : "#000";

      label.setAttribute("fill", color);
      label.style.fill = color;
      label.style.fontWeight = answeredQuestions.includes(value)
        ? "500"
        : "500";
    });
  };

  updateLabels();

  const observer = new MutationObserver(() => {
    updateLabels();
  });

  observer.observe(chartRef.current, {
    childList: true,
    subtree: true,
  });

  return () => observer.disconnect();
}, [answeredQuestions]);
  const visibleSeries = allSeries.filter(
    (item) => !hidden.includes(item.label),
  );

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
      }}
    >
      <CardHeader
        title="Performance Radar"
        subheader="Employee Competencies"
        action={
          <Stack direction="row" spacing={1}>
            <Chip label="FY-2026" color="primary" />
            <Chip label="Engineering" variant="outlined" />
          </Stack>
        }
      />

      <Divider />

      <CardContent>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box   ref={chartRef}
  sx={{
    flex: 1,
    width: "100%",
  }}>
            <RadarChart
              height={500}
              radar={{
                metrics,
                max: 5,
              }}
              series={visibleSeries}
              sx={{
                "& .MuiRadarAreaElement-root:nth-of-type(1)": {
                  fill: "#5B9BFF",
                  fillOpacity: 0.3,
                },

                "& .MuiRadarAreaElement-root:nth-of-type(2)": {
                  fill: "#FFB74D",
                  fillOpacity: 0.25,
                },

                "& .MuiRadarAreaElement-root:nth-of-type(3)": {
                  fill: "#81C784",
                  fillOpacity: 0.25,
                },

                "& .MuiRadarLineElement-root": {
                  strokeWidth: 2,
                },
                "& .MuiRadarAxis-root line": {
                  stroke: "#DADADA",
                },

                "& .MuiRadarGrid-root polygon": {
                  stroke: "#E0E0E0",
                },

                "& .MuiRadarAxisLabel-root": {
                  fontSize: 12,
                  fontWeight: 500,
                },
              }}
            />
          </Box>

          <Stack
            spacing={3}
            sx={{
              width: 220,
            }}
          >
            {allSeries.map((item) => (
              <Stack
                key={item.label}
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{
                  cursor: "pointer",
                  userSelect: "none",
                }}
                onClick={() => toggleSeries(item.label)}
              >
                <Box
                  sx={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    bgcolor: item.color,
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 15,
                    textDecoration: hidden.includes(item.label)
                      ? "line-through"
                      : "none",
                    color: hidden.includes(item.label)
                      ? "text.disabled"
                      : "text.primary",
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
