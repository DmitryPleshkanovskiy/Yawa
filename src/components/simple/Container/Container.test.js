const { render, screen } = require("@testing-library/react");
const { default: Container } = require(".");

describe("Container", () => {
  test("Renders correctly", () => {
    render(<Container></Container>);

    const containerElement = screen.getByTestId("container");

    expect(containerElement).toBeInTheDocument();
  });

  test("Renders children", () => {
    render(
      <Container>
        <div>Test</div>
      </Container>
    );

    const childElement = screen.getByText("Test");

    expect(childElement).toBeInTheDocument();
  });
});
