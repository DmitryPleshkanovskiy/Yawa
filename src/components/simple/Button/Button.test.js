const { render, screen } = require("@testing-library/react");
const { default: Button } = require(".");

describe("Button", () => {
  test("Renders correctly", () => {
    const buttonText = "test button";

    render(<Button>{buttonText}</Button>);

    const buttonElement = screen.getByText(buttonText);

    expect(buttonElement).toBeInTheDocument();
  });

  test("Is loading indicator", () => {
    render(<Button isLoading>test</Button>);

    const loaderElement = screen.getByTestId("loader");

    expect(loaderElement).toBeInTheDocument();
  });
});
