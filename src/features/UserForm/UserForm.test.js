import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserForm from "./UserForm";

describe("UserForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all form fields", () => {
    render(<UserForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /submit/i })
    ).toBeInTheDocument();
  });

  test("shows validation errors when submitted empty", async () => {
    render(<UserForm />);

    await userEvent.click(
      screen.getByRole("button", { name: /submit/i })
    );

     expect(
    await screen.findByText("Name is required")
  ).toBeInTheDocument();

  expect(
    await screen.findByText("Email is required")
  ).toBeInTheDocument();

  expect(
    await screen.findByText("Age must be a number")
  ).toBeInTheDocument();

  expect(
    await screen.findByText("Minimum 6 characters")
  ).toBeInTheDocument();
  });

  test("submits valid form", async () => {
    const consoleSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    render(<UserForm />);

    await userEvent.type(
      screen.getByLabelText(/name/i),
      "Ayushi Patel"
    );

    await userEvent.type(
      screen.getByLabelText(/email/i),
      "ayushi@gmail.com"
    );

    await userEvent.type(
      screen.getByLabelText(/age/i),
      "25"
    );

    await userEvent.type(
      screen.getByLabelText(/password/i),
      "Password123"
    );

    await userEvent.click(
      screen.getByRole("button", { name: /submit/i })
    );

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        {
          name: "Ayushi Patel",
          email: "ayushi@gmail.com",
          age: 25,
          password: "Password123",
        },
        "this is the form console"
      );
    });

    consoleSpy.mockRestore();
  });

  test("allows typing in all fields", async () => {
    render(<UserForm />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const ageInput = screen.getByLabelText(/age/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await userEvent.type(nameInput, "Ayushi");
    await userEvent.type(emailInput, "test@test.com");
    await userEvent.type(ageInput, "30");
    await userEvent.type(passwordInput, "password");

    expect(nameInput).toHaveValue("Ayushi");
    expect(emailInput).toHaveValue("test@test.com");
    expect(ageInput).toHaveValue(30);
    expect(passwordInput).toHaveValue("password");
  });
});