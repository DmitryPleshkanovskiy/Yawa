const { render, screen } = require("@testing-library/react");
const { default: Panel } = require(".");

describe("Panel", () => {
  test("Renders correctly", () => {
    render(<Panel />);

    const panelElement = screen.getByTestId("panel");

    expect(panelElement).toBeInTheDocument();
  });
});

describe("Panel Title", () => {
  test("Renders correctly", () => {
    render(<Panel.Title />);

    const panelTitleElement = screen.getByTestId("panel-title");

    expect(panelTitleElement).toBeInTheDocument();
  });
});

describe("Panel Body", () => {
  test("Renders correctly", () => {
    render(<Panel.Body />);

    const panelBodyElement = screen.getByTestId("panel-body");

    expect(panelBodyElement).toBeInTheDocument();
  });
});
