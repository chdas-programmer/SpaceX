
import ToggleSwitch from "./ToggleSwitch";

interface FiltersProps {
    searchTerm: string;
    setSearchTerm: (val: string) => void;
    selectedYear: string;
    setSelectedYear: (val: string) => void;
    availableYears: string[];
    showSuccessfulOnly: boolean;
    setShowSuccessfulOnly: (val: boolean) => void;
  }
  
  const Filters = ({
    searchTerm, setSearchTerm,
    selectedYear, setSelectedYear,
    availableYears,
    showSuccessfulOnly, setShowSuccessfulOnly
  }: FiltersProps) => {
    return (
      <div className="flex items-center space-x-6 mb-6">
        {/* Search */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Search by mission name</label>
          <input
            type="text"
            placeholder="e.g., Starlink, CRS, Demo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
  
        {/* Year */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
          <select
            value={selectedYear}
            data-testid="year-select" 
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-[15px] focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All years</option>
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
  
        {/* Success only */}
        <div className="flex items-center space-x-2 pt-6">
        <ToggleSwitch
          id="successful-only"
          checked={showSuccessfulOnly}
          onChange={setShowSuccessfulOnly}
          label="Successful only" // now RTL can find it
        />

          <label className="text-sm text-gray-600">Successful only</label>
        </div>
      </div>
    );
  };
  
  export default Filters;
  