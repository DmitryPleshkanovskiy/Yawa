const { render, screen } = require("@testing-library/react");

const { default: Input } = require(".");

test("Input renders", () => {
  render(<Input placeholder="test input" />);

  const inputElement = screen.getByTestId("input");

  expect(inputElement).toBeInTheDocument();
});

test("Shows error message", () => {
  const errorMessage = "test error message";

  render(<Input error={errorMessage} />);

  const t = screen.getByText(errorMessage);

  expect(t).toBeInTheDocument();
});
