import { render, screen } from "@testing-library/react";
import Forecast from ".";

describe("Forecast component", () => {
  test("it renders", () => {
    render(<Forecast />);
  });
});
