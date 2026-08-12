import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

export const orgTree = [
  {
    id: 1,
    name: "Vconstruct",
    level: "Company",
    code: "VCon",
    icon: BusinessIcon,
    children: [
      {
        id: 2,
        name: "Quality Assurance",
        level: "Group",
        code: "QA",
        icon: WorkIcon,
        children: [
          { name: "Operations", level: "Team", code: "OP" },
          { name: "AI/ML", level: "Team", code: "SW" },
        ],
      },
      {
        id: 3,
        name: "Software Solutions",
        level: "Group",
        code: "SS",
        icon: WorkIcon,
        children: [
          { name: "Office 365", level: "Team", code: "O365" },
          {
            name: "Integration Planning",
            level: "Team",
            code: "IP",
          },
        ],
      },
    
      {
        id: 6,
        name: "Data Analytics",
        level: "Group",
        code: "DA",
        icon: WorkIcon,
        children: [
          {
            name: "Niramaan",
            level: "Team",
            code: "Niramaan",
          },
        ],
      },
    ],
  },
];

export const metrics = [
  {
    label: "Company",
    value: 1,
    background: "#eef2ff",
    color: "#322a88",
  },
  {
    label: "Functional Groups",
    value: 3,
    background: "#f5f3ff",
    color: "#7c3aed",
  },
  {
    label: "Functional Teams",
    value: 5,
    background: "#ecfdf5",
    color: "#047857",
  },
];

// tabConfig.js

export const parentOrganizations = ["Group", "Team"];

export const parentGroupOptions = {
  Group: [],
  Team: ["Group"],
  
};

export const parentGroupList = {
  Group: ["Software Solutions", "Quality Assurance", "Data Analytics"],
  Team: ["Operations", "Delivery", "Support"],
};
export const flattenTree = (tree) => {
  const result = [];

  const traverse = (nodes, parent = null) => {
    nodes.forEach((node) => {
      result.push({
        ...node,
        parent,
      });

      if (node.children) {
        traverse(node.children, node);
      }
    });
  };

  traverse(tree);

  return result;
};

export const findParent = (tree, targetName, parent = null) => {
  for (const node of tree) {
    if (node.name === targetName) {
      return parent;
    }

    if (node.children) {
      const found = findParent(node.children, targetName, node);
      if (found) return found;
    }
  }

  return null;
};

