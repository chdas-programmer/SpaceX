import { ThemeToggle } from "./ThemeToggle";
import ToggleSwitch from "./ToggleSwitch";

interface HeaderProps {
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (val: boolean) => void;
}

export const Header = ({ showFavoritesOnly, setShowFavoritesOnly }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Atmosly · SpaceX Mission Explorer</h1>
        <p className="text-gray-600">Fetch real data from the SpaceX public API. Filter, explore, and favorite launches.</p>
      </div>

      <div className="flex items-center space-x-2">
        <ToggleSwitch
          id="favorites-switch"
          checked={showFavoritesOnly}
          onChange={setShowFavoritesOnly}
        />
        <label htmlFor="favorites-switch" className="text-sm text-gray-600">
          Show favorites
        </label>
        <ThemeToggle />
      </div>

    </div>
  );
};
