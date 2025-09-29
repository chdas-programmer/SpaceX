import { Link } from "react-router-dom";
import { LaunchWithRocket } from "@/types/spacex";

interface MissionCardProps {
  launch: LaunchWithRocket;
  isFavorite: boolean;
  toggleFavorite: (id: string) => void;
  formatDate: (dateString: string) => string;
  formatTime: (dateString: string) => string;
}

export const MissionCard = ({ launch, isFavorite, toggleFavorite, formatDate, formatTime }: MissionCardProps) => {
  const launchDate = formatDate(launch.date_utc);
  const launchTime = formatTime(launch.date_utc);

  return (
    <div className="bg-white rounded-[15px] border border-gray-200 p-4">
      {/* Title + Favorite */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 text-lg break-words flex-1 mb-0">
          {launch.name}
        </h3>
        <button
          onClick={() => toggleFavorite(launch.id)}
          className="flex-shrink-0 text-gray-900 hover:text-blue-500 rounded-[15px] border border-gray-400 p-1 px-2 ml-4"
        >
          {isFavorite ? '★' : '☆'} Favorite
        </button>
      </div>

      {/* Info */}
      <div className="text-sm text-gray-600 mb-2">
        {launchDate}, {launchTime} · {launch.rocketName}
      </div>

      {/* Tags */}
      <div className="flex items-center space-x-2 mb-2">
        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-[15px] border border-gray-400">
          TBD
        </span>
        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-[15px] border border-blue-700">
          {new Date(launch.date_utc).getFullYear()}
        </span>
      </div>

      <Link className="text-gray-600 text-sm underline font-semibold" to={`/details/${launch.id}`}>
        View details
      </Link>
    </div>
  );
};
