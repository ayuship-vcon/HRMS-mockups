import React from "react";
import { Box, MenuItem, TextField } from "@mui/material";
import {
  parentOrganizations,
  parentGroupOptions,
  parentGroupList,
  findParent,
  orgTree,
} from "../binding";

function ReadOnlyField({ label, value }) {
  return (
    <TextField
      label={label}
      value={value}
      fullWidth
      size="small"
      disabled
      InputProps={{ readOnly: true }}
    />
  );
}

const AddEditTab = ({ selected }) => {
  const [status, setStatus] = React.useState("Active");
  const [groupName, setGroupName] = React.useState("");
  const [level, setLevel] = React.useState("");
  const [parentGroup, setParentGroup] = React.useState("");
  const [parentGroupName, setParentGroupName] = React.useState("");
  const [shortName, setShortName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const isEdit = Object.keys(selected).length > 0;
  React.useEffect(() => {
    if (!selected) return;

    setLevel(selected.level);
    setGroupName(selected.name);
    setShortName(selected.code);
    setDescription(
      isEdit
        ? "Team responsible for regional operations and implementation delivery."
        : "",
    );

    const parent = findParent(orgTree, selected.name);

    if (parent) {
      setParentGroup(parent.level);
      setParentGroupName(parent.name);
    } else {
      setParentGroup("");
      setParentGroupName("");
    }
  }, [selected]);
  console.log(selected, "selectedselected");

  const handleLevelChange = (e) => {
    const value = e.target.value;

    setLevel(value);

    const groups = parentGroupOptions[value];

    if (groups?.length > 0) {
      setParentGroup(groups[0]);
    } else {
      setParentGroup("");
    }

    setParentGroupName("");
  };
  console.log(selected, shortName, "selectedselected");

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "repeat(2,1fr)",
        },
        gap: 2,
      }}
    >
      <ReadOnlyField label="Organization Name" value={"vConstruct"} />

      <TextField
        select
        label="Level"
        size="small"
        fullWidth
        value={level}
        onChange={handleLevelChange}
        disabled={isEdit}
      >
        {parentOrganizations.map((level) => (
          <MenuItem key={level} value={level}>
            {level}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Name"
        size="small"
        value={groupName ?? ""}
        disabled={isEdit}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <TextField
        label="Short Name"
        value={shortName ?? ""}
        disabled={isEdit}
        onChange={(e) => setShortName(e.target.value)}
        size="small"
      />
      {/* {parentGroupOptions[level]?.length > 0 && (
        <TextField
          select
          label="Parent Group"
          size="small"
          fullWidth
          value={parentGroup}
          onChange={(e) => {
            setParentGroup(e.target.value);
            setParentGroupName("");
          }}
        >
          {parentGroupOptions[level].map((group) => (
            <MenuItem key={group} value={group}>
              {group}
            </MenuItem>
          ))}
        </TextField>
      )} */}
      {parentGroupOptions[level]?.length > 0 && (
        <TextField
          select
          label="Parent Group"
          size="small"
          fullWidth
          value={parentGroupName}
          onChange={(e) => setParentGroupName(e.target.value)}
        >
          {(parentGroupList[parentGroup] || []).map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      )}

      <TextField
        select
        fullWidth
        size="small"
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <MenuItem value={"Active"}>Active</MenuItem>
        <MenuItem value={"Inactive"}>Inactive</MenuItem>
      </TextField>

      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        minRows={4}
        fullWidth
        sx={{
          gridColumn: {
            md: "1 / -1",
          },
        }}
      />
    </Box>
  );
};

export default AddEditTab;
