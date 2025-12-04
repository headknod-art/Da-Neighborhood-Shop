import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App Component", () => {
  it("should render without crashing", () => {
    render(<App />);
    expect(document.body).toBeTruthy();
  });

  it("should render the main content", () => {
    const { container } = render(<App />);
    expect(container.firstChild).toBeTruthy();
  });
});
