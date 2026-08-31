import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { metrics, orgTree } from "./binding";
import TreeNode from "./Treenode";
import HorizontalOrganizationDetails from "./HorizontalOrganizationDetails";

 function Horizontal() {
  const [selected, setSelected] = useState({});
  const [activeTab, setActiveTab] = useState("Add");

  return (
    <Box sx={{ display: "flex" }}>
    
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "#f5f7fa",
          minHeight: "100vh",
          pl: 3,
          pr: 2,
          pt: 10,
        }}
      >
        <Stack
          spacing={2.5}
          sx={{
            maxWidth: 1500,
            mx: "auto",
          }}
        >
          <Paper
            elevation={6}
            sx={{
              p: { xs: 2.5, md: 3.5 },
              borderRadius: 4,
              color: "#ffffff",
              background:
                "linear-gradient(90deg, #020617 0%, #172554 55%, #312e81 100%)",
            }}
          >
            <Stack
              direction={{
                xs: "column",
                lg: "row",
              }}
              spacing={2}
              alignItems={{
                lg: "center",
              }}
              justifyContent="space-between"
            >
              <Box>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{ color: "#bfdbfe" }}
                >
                  HRMS 3.0 · Admin Portal . Horizontal
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight={800}
                  sx={{
                    mt: 0.5,
                    fontSize: {
                      xs: "1.7rem",
                      md: "2.125rem",
                    },
                  }}
                >
                  Organization Structure Configuration
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    maxWidth: 850,
                    color: "#cbd5e1",
                  }}
                >
                  Configure Company, BU, Cluster, Team and future hierarchy
                  levels with tree navigation, node details, mappings and live
                  org chart preview.
                </Typography>
              </Box>
            </Stack>
          </Paper>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 2,
            }}
          >
            {metrics.map((metric) => (
              <Card key={metric.label} elevation={1} sx={{ borderRadius: 4 }}>
                <CardContent>
                  <Chip
                    label={metric.label}
                    size="small"
                    sx={{
                      mb: 1.5,
                      fontWeight: 700,
                      backgroundColor: metric.background,
                      color: metric.color,
                    }}
                  />

                  <Typography variant="h3" fontWeight={800}>
                    {metric.value}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    Configured in current hierarchy
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Card elevation={6} sx={{ borderRadius: 4, overflow: "hidden" }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  lg: "310px minmax(0, 1fr) 40px",
                },
                p: 2,
                minHeight: 650,
              }}
            >
              <Box
                sx={{
                  p: 2,
                  borderRight: {
                    lg: "1px solid",
                  },
                  borderColor: "divider",
                }}
              >
                <Stack direction="row" alignItems="center" sx={{ mb: 1.5 }}>
                  <Typography
                    variant="overline"
                    fontWeight={800}
                    color="text.secondary"
                    sx={{ flexGrow: 1 }}
                  >
                    Hierarchy Tree
                  </Typography>

                  <IconButton
                    size="small"
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 2,
                    }}
                    onClick={()=>setSelected({})}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Stack>

                <Stack spacing={0.5}>
                  {orgTree.map((node) => (
                    <TreeNode
                      key={node.name}
                      node={node}
                      selected={selected}
                      onSelect={setSelected}
                    />
                  ))}
                </Stack>
              </Box>

              <Box>
                <HorizontalOrganizationDetails
                  selected={selected}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  onSave={() => {
                    console.log("");
                  }}
                  onReset={() => {
                    console.log("");
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 1,
                    mt: 2,
                  }}
                >
                  <Button variant="contained" startIcon={<SaveIcon />}>
                    Save
                  </Button>

                  <Button variant="outlined" startIcon={<RestartAltIcon />}>
                    Reset
                  </Button>
                </Box>
              </Box>

        
            </Box>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
}
export default Horizontal;