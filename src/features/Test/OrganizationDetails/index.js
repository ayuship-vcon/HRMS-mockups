import React, { useEffect } from "react";
import { Box, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";

import AddEditTab from "./AddEditTab";
import TeamLeadTab from "./TeamLeadTab";
import LeaveApproversTab from "./LeaveApproversTab";
import ActionButtons from "./ActionButtons";
import { leadTabs, TAB_CONFIG } from "../binding";

const OrganizationDetails = ({
  selected,
  activeTab,
  setActiveTab,
  onSave,
  onReset,
}) => {
  const tabs = TAB_CONFIG[selected.level] || ["Add"];
  useEffect(() => {
    setActiveTab("Add");
  }, [selected]);

  const renderTab = () => {
    if (activeTab === "Add") {
      return <AddEditTab {...{selected, activeTab}} />;
    }

    if (leadTabs.includes(activeTab)) {
      return <TeamLeadTab {...{selected, activeTab}} />;
    }

    if (activeTab === "Leave Approvers") {
      return <LeaveApproversTab {...{selected, activeTab}} />;
    }

    return null;
  };

  return (
    <Box
      sx={{
        p: {
          xs: 2,
          md: 2.5,
        },
        height: "100%",
      }}
    >
      {/* Header */}

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={2}
        alignItems={{
          sm: "center",
        }}
        justifyContent="space-between"
        sx={{
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="h5" fontWeight={800}>
            {selected.name || "Add Organization"}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {selected.level
              ? `${selected.level} · ${selected.code} · Active`
              : "Select an organization"}{" "}
          </Typography>
        </Box>
      </Stack>

      {/* Tabs */}

      <Paper
        elevation={1}
        sx={{
          mb: 2.5,
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(_, value) => setActiveTab(value)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab}
              value={tab}
              label={tab}
              sx={{
                textTransform: "none",
                fontWeight: 700,
              }}
            />
          ))}
        </Tabs>
      </Paper>

      {/* Tab Content */}

      {renderTab()}

      {/* Footer */}

      <ActionButtons onSave={onSave} onReset={onReset} selected={selected}/>
    </Box>
  );
};

export default OrganizationDetails;
