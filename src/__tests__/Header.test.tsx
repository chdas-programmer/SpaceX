import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "../components/Header";

describe("Header component", () => {
  const mockSetShowFavoritesOnly = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the title and description", () => {
    render(
      <Header showFavoritesOnly={false} setShowFavoritesOnly={mockSetShowFavoritesOnly} />
    );

    expect(screen.getByText(/Atmosly · SpaceX Mission Explorer/i)).toBeInTheDocument();
    expect(screen.getByText(/Fetch real data from the SpaceX public API/i)).toBeInTheDocument();
  });

  it("renders the favorites toggle and calls onChange when clicked", () => {
    render(
      <Header showFavoritesOnly={false} setShowFavoritesOnly={mockSetShowFavoritesOnly} />
    );

    // Get the toggle using its label
    const toggle = screen.getByLabelText(/Show favorites/i);
    expect(toggle).toBeInTheDocument();

    // Simulate click
    fireEvent.click(toggle);
    expect(mockSetShowFavoritesOnly).toHaveBeenCalledWith(true);
  });

  it("renders the ThemeToggle component", () => {
    render(
      <Header showFavoritesOnly={false} setShowFavoritesOnly={mockSetShowFavoritesOnly} />
    );

    // Just check for presence; assuming ThemeToggle renders a button or element with text/icon
    expect(screen.getByRole("button")).toBeInTheDocument(); 
    // or if it has specific text/icon: screen.getByText(/theme/i)
  });
});
