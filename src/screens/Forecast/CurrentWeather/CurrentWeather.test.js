import { render, screen } from "@testing-library/react";
import CurrentWeather from ".";

describe("CurrentWeather component", () => {
  test("it renders", () => {
    render(<CurrentWeather />);
  });
});
