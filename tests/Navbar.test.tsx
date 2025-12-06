import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Navbar } from "../components/Navbar";

describe("Navbar Component", () => {
  const mockCartClick = () => {};

  it("should render without crashing", () => {
    const { container } = render(<Navbar onCartClick={mockCartClick} cartCount={0} />);
    expect(container).toBeTruthy();
  });

  it("should have navigation elements", () => {
    const { container } = render(<Navbar onCartClick={mockCartClick} cartCount={0} />);
    expect(container.firstChild).toBeTruthy();
  });
});
