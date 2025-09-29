import { MissionCard } from "./MissionCard";
import { LaunchWithRocket } from "@/types/spacex";

interface MissionGridProps {
  launches: LaunchWithRocket[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
  formatDate: (d: string) => string;
  formatTime: (d: string) => string;
}

export const MissionGrid = ({ launches, favorites, toggleFavorite, formatDate, formatTime }: MissionGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-8">
      {launches.map(launch => (
        <MissionCard
          key={launch.id}
          launch={launch}
          isFavorite={favorites.includes(launch.id)}
          toggleFavorite={toggleFavorite}
          formatDate={formatDate}
          formatTime={formatTime}
        />
      ))}
    </div>
  );
};
