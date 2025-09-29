import { useState } from 'react';
import { Calendar, Rocket, Star, CircleAlert as AlertCircle, CircleCheck as CheckCircle, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LaunchWithRocket } from '../types/spacex';
import { useFavorites } from '../contexts/FavoritesContext';
import { LaunchDetailModal } from './LaunchDetailModal';

interface LaunchCardProps {
  launch: LaunchWithRocket;
}

export const LaunchCard: React.FC<LaunchCardProps> = ({ launch }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [showDetail, setShowDetail] = useState(false);
  
  const launchDate = new Date(launch.date_utc);
  const isSuccessful = launch.success;
  const isFav = isFavorite(launch.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(launch.id);
  };

  return (
    <>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group rounded-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
              {launch.name}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavoriteClick}
              className="shrink-0 ml-2"
            >
              <Star
                className={`h-5 w-5 ${
                  isFav ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                }`}
              />
            </Button>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            {launchDate.toLocaleDateString()}
          </div>
        </CardHeader>

        <CardContent onClick={() => setShowDetail(true)}>
          {/* Mission Patch */}
          <div className="flex justify-center mb-4">
            {launch.links.patch.small ? (
              <img
                src={launch.links.patch.small}
                alt={`${launch.name} patch`}
                className="w-20 h-20 object-contain rounded-full bg-muted p-2"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                <Rocket className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
          </div>

          {/* Rocket Info */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm">
              <Rocket className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{launch.rocketName}</span>
            </div>
          </div>

          {/* Status and Links */}
          <div className="flex items-center justify-between">
            <Badge
              variant={
                isSuccessful === true 
                  ? 'default' 
                  : isSuccessful === false 
                  ? 'destructive' 
                  : 'secondary'
              }
              className="flex items-center gap-1"
            >
              {isSuccessful === true ? (
                <>
                  <CheckCircle className="h-3 w-3" />
                  Success
                </>
              ) : isSuccessful === false ? (
                <>
                  <AlertCircle className="h-3 w-3" />
                  Failed
                </>
              ) : (
                'Pending'
              )}
            </Badge>

            {(launch.links.wikipedia || launch.links.webcast) && (
              <div className="flex items-center gap-1">
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Links</span>
              </div>
            )}
          </div>

          {/* Flight Number */}
          <div className="text-xs text-muted-foreground mt-2">
            Flight #{launch.flight_number}
          </div>
        </CardContent>
      </Card>

      <LaunchDetailModal
        launch={launch}
        open={showDetail}
        onOpenChange={setShowDetail}
      />
    </>
  );
};