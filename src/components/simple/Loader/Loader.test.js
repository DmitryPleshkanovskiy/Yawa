const { render, screen } = require("@testing-library/react");
const { default: Loader } = require(".");

describe("Loader", () => {
  test("Renders correctly", () => {
    render(<Loader />);

    const loaderElement = screen.getByTestId("loader");

    expect(loaderElement).toBeInTheDocument();
  });
});
