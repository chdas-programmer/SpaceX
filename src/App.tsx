    import { useState, useMemo } from "react";
    import { FavoritesProvider, useFavorites } from "./contexts/FavoritesContext";
    import { useSpaceXData } from "./hooks/useSpaceXData";
    import { useDebounce } from "./hooks/useDebounce";
    import { LoadingGrid } from "./components/LoadingSkeleton";
    import { ErrorMessage } from "./components/ErrorMessage";

    import { Header } from "./components/Header";
    import Filters from "./components/Filters";
    import { MissionGrid } from "./components/MissionGrid";
    import { Pagination } from "./components/Pagination";

    const AppContent = () => {
      const { launches, loading, error } = useSpaceXData();
      const { favorites, toggleFavorite } = useFavorites();

      const [currentPage, setCurrentPage] = useState(1);
      const [searchTerm, setSearchTerm] = useState("");
      const [selectedYear, setSelectedYear] = useState("all");
      const [showSuccessfulOnly, setShowSuccessfulOnly] = useState(false);
      const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

      const debouncedSearchTerm = useDebounce(searchTerm, 300);

      const availableYears = useMemo(() => {
        const years = launches.map(l => new Date(l.date_utc).getFullYear().toString());
        return Array.from(new Set(years)).sort().reverse();
      }, [launches]);

      const filteredLaunches = useMemo(() => {
        return launches.filter(l => {
          if (debouncedSearchTerm && !l.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) return false;
          if (selectedYear !== "all" && new Date(l.date_utc).getFullYear().toString() !== selectedYear) return false;
          if (showSuccessfulOnly && l.success !== true) return false;
          if (showFavoritesOnly && !favorites.includes(l.id)) return false;
          return true;
        });
      }, [launches, debouncedSearchTerm, selectedYear, showSuccessfulOnly, showFavoritesOnly, favorites]);

      const itemsPerPage = 12;
      const totalPages = Math.ceil(filteredLaunches.length / itemsPerPage);
      const paginatedLaunches = filteredLaunches.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

      const formatDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" });
      const formatTime = (d: string) => new Date(d).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });

      if (loading) return (
        <div className="mt-36 p-6 mx-48">
          <LoadingGrid />
        </div>
        
      ) 
      if (error) return <ErrorMessage message={`Failed to load SpaceX data: ${error}`} onRetry={() => window.location.reload()} />;

      return (
        <div className="min-h-screen bg-gray-50 ">
          <div className="max-w-7xl mx-auto   ">

            <div className="p-4 pb-0 px-8">
                <Header showFavoritesOnly={showFavoritesOnly} setShowFavoritesOnly={setShowFavoritesOnly} />
                
            </div>
            
            <div className=" p-4 px-8 border-t border-gray-300 min-h-[100vh] dark:bg-gray-800 bg-gray-100">
                <Filters
                  searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                  selectedYear={selectedYear} setSelectedYear={setSelectedYear}
                  availableYears={availableYears}
                  showSuccessfulOnly={showSuccessfulOnly} setShowSuccessfulOnly={setShowSuccessfulOnly}
                />
                <MissionGrid
                  launches={paginatedLaunches}
                  favorites={favorites}
                  toggleFavorite={toggleFavorite}
                  formatDate={formatDate}
                  formatTime={formatTime}
                />
                <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
            </div>
            
          </div>
        </div>
      );
    };

    export default function App() {
      return (
        <FavoritesProvider>
          <AppContent />
        </FavoritesProvider>
      );
    }
