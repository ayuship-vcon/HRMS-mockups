import { render, screen } from "@testing-library/react";
import Users from "./index";
import { ReusableTable } from "../../components";

describe("Users", () => {
  test("renders users table", () => {
    render(<Users />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Surname")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();

    expect(screen.getAllByText("John")[0])
      .toBeInTheDocument();

    expect(screen.getAllByText("Active")[0])
      .toBeInTheDocument();
  });

  test("shows first page data", () => {
    render(<Users />);

    expect(screen.getByText("California"))
      .toBeInTheDocument();

    expect(screen.getByText("Miami"))
      .toBeInTheDocument();
  });
  test("passes data to ReusableTable", () => {
    render(<Users />);

    expect(ReusableTable).toHaveBeenCalled();

    expect(
      screen.getByTestId("table")
    ).toBeInTheDocument();
  });
});
