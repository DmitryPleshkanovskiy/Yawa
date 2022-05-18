import { shallow } from "enzyme";
import { findByTestAttribute } from "test/testUtils";

const { render, screen } = require("@testing-library/react");
const { default: Button } = require(".");

describe("Button component", () => {
  // Test with Enzyme
  test("Renders without error", () => {
    const wrapper = shallow(<Button />);

    const buttonComponent = findByTestAttribute(wrapper, "button");

    expect(buttonComponent.length).toBe(1);
  });

  test("Click event handling", () => {
    const clickHandler = jest.fn().mockImplementation(() => {});
    const wrapper = shallow(<Button onClick={clickHandler} />);

    const buttonComponent = findByTestAttribute(wrapper, "button");

    buttonComponent.simulate("click");
    expect(clickHandler).toBeCalled();
  });

  test("Renders with loading indicator", () => {
    const wrapper = shallow(<Button isLoading />);

    const loaderComponent = findByTestAttribute(wrapper, "loader");

    expect(loaderComponent.length).toBe(1);
  });

  test("Renders without loading indicator", () => {
    const wrapper = shallow(<Button isLoading={false} />);

    const loaderComponent = findByTestAttribute(wrapper, "loader");

    expect(loaderComponent.length).toBe(0);
  });

  test("Renders without loading indicator", () => {
    const wrapper = shallow(<Button isLoading={false} />);

    const loaderComponent = findByTestAttribute(wrapper, "loader");

    expect(loaderComponent.length).toBe(0);
  });

  test("Renders button text", () => {
    const buttonLabel = "test button label";

    const wrapper = shallow(<Button isLoading={false}>{buttonLabel}</Button>);

    const buttonComponent = findByTestAttribute(wrapper, "button");

    expect(buttonComponent.text()).toEqual(buttonLabel);
  });

  // Tests with react testing library
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
