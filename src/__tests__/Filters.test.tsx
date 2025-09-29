import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "../components/Filters";

describe("Filters component", () => {
  const mockSetSearchTerm = vi.fn();
  const mockSetSelectedYear = vi.fn();
  const mockSetShowSuccessfulOnly = vi.fn();

  const availableYears = ["2020", "2021", "2022"];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders search input, year select, and success toggle", () => {
    render(
      <Filters
        searchTerm=""
        setSearchTerm={mockSetSearchTerm}
        selectedYear="all"
        setSelectedYear={mockSetSelectedYear}
        availableYears={availableYears}
        showSuccessfulOnly={false}
        setShowSuccessfulOnly={mockSetShowSuccessfulOnly}
      />
    );

    expect(screen.getByPlaceholderText(/e\.g\., Starlink, CRS, Demo/i)).toBeInTheDocument();
    expect(screen.getByTestId("year-select")).toBeInTheDocument();
    expect(screen.getByLabelText(/Successful only/i)).toBeInTheDocument();
  });

  it("calls setSearchTerm when typing in search input", () => {
    render(
      <Filters
        searchTerm=""
        setSearchTerm={mockSetSearchTerm}
        selectedYear="all"
        setSelectedYear={mockSetSelectedYear}
        availableYears={availableYears}
        showSuccessfulOnly={false}
        setShowSuccessfulOnly={mockSetShowSuccessfulOnly}
      />
    );

    const input = screen.getByPlaceholderText(/e\.g\., Starlink, CRS, Demo/i);
    fireEvent.change(input, { target: { value: "CRS" } });

    expect(mockSetSearchTerm).toHaveBeenCalledWith("CRS");
  });

  it("calls setSelectedYear when selecting a year", () => {
    render(
      <Filters
        searchTerm=""
        setSearchTerm={mockSetSearchTerm}
        selectedYear="all"
        setSelectedYear={mockSetSelectedYear}
        availableYears={availableYears}
        showSuccessfulOnly={false}
        setShowSuccessfulOnly={mockSetShowSuccessfulOnly}
      />
    );

    const select = screen.getByTestId("year-select");
    fireEvent.change(select, { target: { value: "2021" } });

    expect(mockSetSelectedYear).toHaveBeenCalledWith("2021");
  });

  it("calls setShowSuccessfulOnly when toggling the switch", () => {
    render(
      <Filters
        searchTerm=""
        setSearchTerm={mockSetSearchTerm}
        selectedYear="all"
        setSelectedYear={mockSetSelectedYear}
        availableYears={availableYears}
        showSuccessfulOnly={false}
        setShowSuccessfulOnly={mockSetShowSuccessfulOnly}
      />
    );

    const toggle = screen.getByLabelText(/Successful only/i);
    fireEvent.click(toggle);

    expect(mockSetShowSuccessfulOnly).toHaveBeenCalledWith(true);
  });
});
