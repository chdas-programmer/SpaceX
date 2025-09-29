export const LaunchCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>
      
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>

      <div className="flex items-center space-x-2 mb-4">
        <div className="h-6 bg-gray-200 rounded w-12"></div>
        <div className="h-6 bg-gray-200 rounded w-12"></div>
      </div>

      <div className="h-4 bg-gray-200 rounded w-20"></div>
    </div>
  );
};

export const LoadingGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, i) => (
        <LaunchCardSkeleton key={i} />
      ))}
    </div>
  );
};