import { render, screen, fireEvent } from "@testing-library/react";
import ReusableTable from "./Table";
import userEvent from "@testing-library/user-event";


const columns = [
  {
    field: "name",
    headerName: "Name",
  },
  {
    field: "age",
    headerName: "Age",
  },
];

const data = [
  { name: "Ayushi", age: 25 },
  { name: "Rahul", age: 28 },
  { name: "Priya", age: 30 },
  { name: "Amit", age: 35 },
  { name: "John", age: 40 },
  { name: "Sara", age: 45 },
];

describe("ReusableTable", () => {
  test("renders table headers", () => {
    render(
      <ReusableTable
        columns={columns}
        data={data}
      />
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
  });

  test("renders row data", () => {
    render(
      <ReusableTable
        columns={columns}
        data={data}
      />
    );

    expect(screen.getByText("Ayushi")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
  });

  test("shows only first 5 rows by default", () => {
    render(
      <ReusableTable
        columns={columns}
        data={data}
      />
    );

    expect(screen.getByText("Ayushi")).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();

    expect(
      screen.queryByText("Sara")
    ).not.toBeInTheDocument();
  });

  test("changes page correctly", () => {
    render(
      <ReusableTable
        columns={columns}
        data={data}
      />
    );

    const nextPageButton = screen.getByLabelText(
      /go to next page/i
    );

    fireEvent.click(nextPageButton);

    expect(
      screen.getByText("Sara")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Ayushi")
    ).not.toBeInTheDocument();
  });

  test("changes rows per page", async() => {
    render(
      <ReusableTable
        columns={columns}
        data={data}
      />
    );

      const select = screen.getByRole("combobox");

  await userEvent.click(select);

  const option10 = await screen.findByRole("option", {
    name: "10",
  });

  await userEvent.click(option10);
    expect(
      screen.getByText("Sara")
    ).toBeInTheDocument();
  });

  test("renders custom render function", () => {
    const customColumns = [
      {
        field: "name",
        headerName: "Name",
        render: (value) => `Employee: ${value}`,
      },
    ];

    render(
      <ReusableTable
        columns={customColumns}
        data={[{ name: "Ayushi" }]}
      />
    );

    expect(
      screen.getByText("Employee: Ayushi")
    ).toBeInTheDocument();
  });

  test("handles empty data", () => {
    render(
      <ReusableTable
        columns={columns}
        data={[]}
      />
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();

    expect(
      screen.queryByText("Ayushi")
    ).not.toBeInTheDocument();
  });
});