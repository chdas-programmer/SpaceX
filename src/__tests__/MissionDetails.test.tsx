import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import MissionDetails from "../components/MissionDetails";
import * as SpaceXHook from "../hooks/useSpaceXData";

// Mock react-router-dom before importing the component
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: "1" }),
  };
});

describe("MissionDetails component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(SpaceXHook, "useSpaceXData").mockReturnValue({
      launches: [],
      loading: false,
      error: null,
      rockets:[]
    });
  });

  it("shows loading state", () => {
    vi.spyOn(SpaceXHook, "useSpaceXData").mockReturnValue({
      launches: [],
      loading: true,
      error: null,
      rockets:[]
    });

    render(
      <MemoryRouter>
        <MissionDetails />
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading mission details/i)).toBeInTheDocument();
  });

  it("shows error state and navigates back on button click", () => {
    vi.spyOn(SpaceXHook, "useSpaceXData").mockReturnValue({
      launches: [],
      loading: false,
      error: "Failed to fetch",
      rockets:[]
    });

    render(
      <MemoryRouter>
        <MissionDetails />
      </MemoryRouter>
    );

    expect(screen.getByText(/Error loading mission details/i)).toBeInTheDocument();

    const button = screen.getByText(/Return to missions/i);
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("shows 'Mission not found' when id does not exist", () => {
    vi.spyOn(SpaceXHook, "useSpaceXData").mockReturnValue({
      launches: [],
      loading: false,
      error: null,
      rockets:[]
    });

    render(
      <MemoryRouter initialEntries={["/missions/123"]}>
        <Routes>
          <Route path="/missions/:id" element={<MissionDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Mission not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Return to missions/i)).toBeInTheDocument();
  });

  it("renders mission details correctly", () => {
    const mockLaunch = {
      id: "1",
      name: "CRS-20",
      rocket: "falcon9-id",      // <-- required by Launch
      rocketName: "Falcon 9",    // <-- used in component
      flight_number: 123,
      date_utc: "2020-03-07T04:50:31.000Z",
      success: true,
      details: "Test mission details",
      links: {
        patch: { large: "", small: "" },
        wikipedia: "https://wikipedia.org",
        webcast: "https://youtube.com",
      },
    };
    

    vi.spyOn(SpaceXHook, "useSpaceXData").mockReturnValue({
      launches: [mockLaunch],
      loading: false,
      error: null,
      rockets:[],
      
    });

    render(
      <MemoryRouter initialEntries={["/missions/1"]}>
        <Routes>
          <Route path="/missions/:id" element={<MissionDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/CRS-20/i)).toBeInTheDocument();
    const rockets=screen.getAllByText(/Falcon 9/i);
    expect(rockets[0]).toBeInTheDocument();
    expect(screen.getByText(/Test mission details/i)).toBeInTheDocument();
    expect(screen.getByText(/Mission Successful/i)).toBeInTheDocument();
    expect(screen.getByText(/Wikipedia/i)).toBeInTheDocument();
    expect(screen.getByText(/Watch Launch/i)).toBeInTheDocument();
  });
});
