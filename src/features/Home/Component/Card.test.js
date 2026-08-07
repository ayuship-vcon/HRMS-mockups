import { render, screen } from "@testing-library/react";
import BasicCard from "./Card";

describe("BasicCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const mockItem = {
    firstName: "Ayushi",
    lastName: "Patel",
    image: "https://test.com/avatar.jpg",
    age: 25,
    height: 165,
    company: {
      department: "Engineering",
      title: "Software Engineer",
    },
  };

  test("renders user details correctly", () => {
    render(<BasicCard item={mockItem} />);

    expect(screen.getByText("Ayushi Patel")).toBeInTheDocument();

    expect(screen.getByText("Engineering")).toBeInTheDocument();

    expect(screen.getByText("Software Engineer")).toBeInTheDocument();

    expect(screen.getByText("Age: 25")).toBeInTheDocument();

    expect(screen.getByText("Height: 165")).toBeInTheDocument();
  });

  test("renders image correctly", () => {
    render(<BasicCard item={mockItem} />);

    const image = screen.getByRole("img");

    expect(image).toHaveAttribute("src", "https://test.com/avatar.jpg");

    expect(image).toHaveAttribute("alt", "Ayushi");
  });

  test("renders view profile button", () => {
    render(<BasicCard item={mockItem} />);

    expect(
      screen.getByRole("button", {
        name: /view profile/i,
      }),
    ).toBeInTheDocument();
  });

  test("handles empty item", () => {
    render(<BasicCard item={{}} />);

    expect(screen.getByText("Age: 0")).toBeInTheDocument();

    expect(screen.getByText("Height: 0")).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /view profile/i,
      }),
    ).toBeInTheDocument();
  });

  test("handles null item", () => {
    render(<BasicCard item={null} />);

    expect(screen.getByText("Age: 0")).toBeInTheDocument();

    expect(screen.getByText("Height: 0")).toBeInTheDocument();
  });
});
