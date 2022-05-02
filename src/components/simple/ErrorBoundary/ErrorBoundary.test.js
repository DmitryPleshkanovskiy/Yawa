const { render, screen } = require("@testing-library/react");
const { default: ErrorBoundary } = require(".");

describe("Error Boundary", () => {
  test("Render children with no errors", () => {
    const text = "Test element";

    render(
      <ErrorBoundary>
        <div>{text}</div>
      </ErrorBoundary>
    );

    const childElement = screen.getByText(text);

    expect(childElement).toBeInTheDocument();
  });

  test("Render with error", () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const text = "Test element";

    const ThrowError = () => {
      throw new Error("Test");
    };

    render(
      <ErrorBoundary>
        <div>{text}</div>
        <ThrowError />
      </ErrorBoundary>
    );

    const childElement = screen.getByTestId("error-message");

    expect(childElement).toBeInTheDocument();
    expect(consoleError).toHaveBeenCalled();
  });
});
